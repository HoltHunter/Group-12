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
                SELECT p.id, p.date_created, p.user_id, p.content, p.likes_count, u.first_name, u.last_name
                FROM posts p
                JOIN users u ON p.user_id = u.id
                WHERE p.user_id = ${ id }
                ORDER BY p.date_created desc
                LIMIT 10;
            `)
            res.send(result.rows)
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
            console.log(friends.rows)
            console.log("'" + friends.rows.map(value => value.user_id === userId ? value.other_user_id : value.user_id ).join("','") + "'")
            const result = await client.query(`
                SELECT p.id, p.date_created, p.user_id, p.content, p.likes_count, u.first_name, u.last_name
                FROM posts p
                JOIN users u ON p.user_id = u.id
                WHERE p.user_id != ${ userId }
                AND p.user_id IN (${"'" + friends.rows.map(value => value.user_id === userId ? value.other_user_id : value.user_id ).join("','") + "'"})
                ORDER BY p.date_created DESC
                LIMIT 10;
            `)
            res.send(result.rows)
        } catch (err) {
            console.log(err.stack)
        } finally {
            client.release()
        }
    })
    // Configure likes for posts
    .post('/likes', async (req, res) => {
        const client = await pool.connect()
        try {
            const userId = req.body.userId
            const postId = req.body.postId
            const result = await client.query(`
                SELECT pl.user_id, pl.post_id
                FROM post_likes pl
                WHERE pl.user_id = ${ userId } AND pl.post_id = ${ postId };
            `)
            if (result.rows == "") {
                client.query(`
                    INSERT INTO post_likes (user_id, post_id)
                    VALUES(${userId},${postId});
                `)
                client.query(`
                    UPDATE posts
                    SET likes_count = likes_count+1
                    WHERE id = ${ postId };
                `)
                res.send("Post like added!")
            } else {
                client.query(`
                    DELETE FROM post_likes
                    WHERE user_id = ${ userId } AND post_id = ${ postId };
                `)
                client.query(`
                    UPDATE posts
                    SET likes_count = likes_count-1
                    WHERE id = ${ postId };
                `)
                res.send("Post like deleted!")
            }
        } catch (err) {
            console.log(err.stack)
        } finally {
            client.release()
        }
    })
    
module.exports = router;