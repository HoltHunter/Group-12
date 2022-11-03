const express = require("express");
const router = express.Router();
const Yup = require("yup");
const pool = require("../src/db");
//const bcrypt = require("bcrypt");

router
    .get('/users', async (req, res) => {
        const client = await pool.connect()
        try {
            const result = await client.query(`
                SELECT u.id, u.first_name, u.last_name, username 
                FROM users u
            `)
            res.send(result.rows)
        } catch (err) {
            console.log(err.stack)
        } finally {
            client.release()
        }
    })
    .post('/users', async (req, res) => {
        const client = await pool.connect()
        try {
            const userId = req.body.userId
            const result = await client.query(`
                SELECT u.id, u.first_name, u.last_name, 
                    CASE WHEN ${ userId } < u.id AND f.user_id = ${ userId } THEN true 
                         WHEN ${ userId } > u.id AND f2.other_user_id = ${ userId } THEN true 
                        ELSE false 
                        END AS is_friend, 
                    CASE WHEN (fr.id IS NOT NULL AND fr.decision IS NULL) THEN fr.id ELSE null 
                        END AS friend_request_id
                FROM users u                                                   
                LEFT JOIN friends f ON u.id = f.other_user_id AND f.user_id = ${ userId }
                LEFT JOIN friends f2 ON u.id = f2.user_id AND f2.other_user_id = ${ userId } 
                LEFT JOIN friend_requests fr ON u.id = fr.request_from_id AND fr.user_id = ${ userId }
                WHERE u.id != ${ userId }
                ORDER BY u.id;
            `)
            res.send(result.rows)
        } catch (err) {
            console.log(err.stack)
        } finally {
            client.release()
        }
    })
    .post('/users/:id', async (req, res) => {
        const client = await pool.connect()
        try {
            const userId = req.body.userId
            let { id } = req.params   // Pull id from URL parameter
            const result = await client.query(`
                SELECT u.id, u.first_name, u.last_name, 
                    CASE WHEN ${ userId } < u.id AND f.user_id = ${ userId } THEN true 
                         WHEN ${ userId } > u.id AND f2.other_user_id = ${ userId } THEN true 
                        ELSE false 
                        END AS is_friend, 
                    CASE WHEN (fr.id IS NOT NULL AND fr.decision IS NULL) THEN fr.id ELSE null 
                        END AS friend_request_id
                FROM users u                                                   
                LEFT JOIN friends f ON u.id = f.other_user_id AND f.user_id = ${ userId }
                LEFT JOIN friends f2 ON u.id = f2.user_id AND f2.other_user_id = ${ userId } 
                LEFT JOIN friend_requests fr ON u.id = fr.request_from_id AND fr.user_id = ${ userId }
                WHERE u.id = ${ id }
                ;
            `)
            res.send(result.rows)
        } catch (err) {
            console.log(err.stack)
        } finally {
            client.release()
        }
    })
    .post('/friendRequests', async (req, res) => {
            const client = await pool.connect()
            try {
                const userId = req.body.userId
                const result = await client.query(`
                    SELECT fr.id, fr.request_from_id, fr.date_created
                    FROM friend_requests fr 
                    WHERE fr.decision IS NULL 
                    AND fr.user_id = ${ userId }
                    ;
                `)
                res.send(result.rows)
            } catch (err) {
                console.log(err.stack)
            } finally {
                client.release()
            }
    })

    // Individual profile posts
    .post('/posts/:id', async (req, res) => {
        const client = await pool.connect()
        try {
            const userId = req.body.userId
            let { id } = req.params   // Pull id from URL parameter
            const result = await client.query(`
                SELECT p.id, p.date_created, p.user_id, p.content, p.likes_count, u.first_name, u.last_name, 
                    CASE WHEN l.user_id IS NOT NULL THEN true ELSE false END as liked,
                    p.shared_post_id
                FROM posts p
                JOIN users u ON p.user_id = u.id
                LEFT JOIN post_likes l on l.user_id = ${ userId } and l.post_id = p.id
                WHERE p.user_id = ${ id }
                ORDER BY p.date_created desc
                LIMIT 10;
            `)
            const sharedPostIds = result.rows.map(post => post.shared_post_id)
            if (sharedPostIds[0]) {
                const sharedPosts = await client.query(`
                    SELECT p.id, p.date_created, p.user_id, p.content, p.likes_count, u.first_name, u.last_name
                    FROM posts p
                    JOIN users u ON p.user_id = u.id
                    WHERE p.id IN (${ sharedPostIds })
                `)
                const newResults = []
                for (const post of result.rows) {
                    for (const sharedPost of sharedPosts.rows) {
                        if (post.shared_post_id === sharedPost.id) {
                            post.shared_post = sharedPost
                        }
                    }
                    newResults.push(post)
                }
                res.send(newResults)
            } else {
                res.send(result.rows)
            }
            
        } catch (err) {
            console.log(err.stack)
        } finally {
            client.release()
        }
    })
    .post('/posts/:id/comments/:postId', async (req, res) => {
        const client = await pool.connect()
        try {
            // const userId = req.body.userId
            let { postId } = req.params   // Pull id from URL parameter
            const result = await client.query(`
                SELECT p.post_id, p.user_id, p.date_created, p.content, u.first_name, u.last_name
                FROM post_comments p
                JOIN users u ON p.user_id = u.id
                WHERE p.post_id = ${ postId }
                ORDER BY p.date_created desc
                ;
            `)
            res.send(result.rows)
        } catch (err) {
            console.log(err.stack)
        } finally {
            client.release()
        }
    })

    // Retrieving posts from all friends
    .post('/posts', async (req, res) => {
        const client = await pool.connect()
        try {
            const userId = req.body.userId
            const friends = await client.query(`
                SELECT f.user_id, f.other_user_id
                FROM friends f
                WHERE f.user_id = ${ userId }
                OR f.other_user_id = ${ userId }
                ;
            `)
            const result = await client.query(`
                SELECT p.id, p.date_created, p.user_id, p.content, p.likes_count, u.first_name, u.last_name, 
                    CASE WHEN l.user_id IS NOT NULL THEN true ELSE false END as liked,
                    p.shared_post_id
                FROM posts p
                JOIN users u ON p.user_id = u.id
                LEFT JOIN post_likes l on l.user_id = ${ userId } and l.post_id = p.id
                WHERE p.user_id != ${ userId }
                AND p.user_id IN (${"'" + friends.rows.map(value => value.user_id === userId ? value.other_user_id : value.user_id ).join("','") + "'"})
                ORDER BY p.date_created DESC
                LIMIT 10;
            `)
            const sharedPostIds = result.rows.map(post => post.shared_post_id)
            if (sharedPostIds[0]) {
                const sharedPosts = await client.query(`
                    SELECT p.id, p.date_created, p.user_id, p.content, p.likes_count, u.first_name, u.last_name
                    FROM posts p
                    JOIN users u ON p.user_id = u.id
                    WHERE p.id IN (${ sharedPostIds })
                `)
                const newResults = []
                for (const post of result.rows) {
                    for (const sharedPost of sharedPosts.rows) {
                        if (post.shared_post_id === sharedPost.id) {
                            post.shared_post = sharedPost
                        }
                    }
                    newResults.push(post)
                }
                res.send(newResults)
            } else {
                res.send(result.rows)
            }
        } catch (err) {
            console.log(err.stack)
        } finally {
            client.release()
        }
    })
    
module.exports = router;