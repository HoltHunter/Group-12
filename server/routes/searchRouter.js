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
    // Do not want to request posts from who requested the posts,
    //      unless specified (home page)
    // Limit the result to 10 rows/posts (pagination)
    // Check to see if :id is a URL parameter
    .post('/posts/:id', async (req, res) => {
        const client = await pool.connect()
        try {
            const userId = req.body.userId
            let {id} = req.params   // Pull id URL parameter
            parseInt("id")          // Parse from String to Int
            let result = null
            if (id != userId) {
                result = await client.query(`
                SELECT p.id, p.date_created, p.user_id, p.content, p.likes_count
                FROM posts p
                WHERE p.user_id = ${ id }
                ORDER BY p.date_created desc
                LIMIT 10;
            `)
            } else {
                result = await client.query(`
                SELECT p.id, p.date_created, p.user_id, p.content, p.likes_count
                FROM posts p
                WHERE p.user_id = ${ id }
                ORDER BY p.date_created desc
                LIMIT 10;
            `)
            }
            res.send(result.rows)
        } catch (err) {
            console.log(err.stack)
        } finally {
            client.release()
        }
    })
    // Retrieving all posts from self and friends
    .post('/posts', async (req, res) => {
        const client = await pool.connect()
        try {
            const userId = req.body.userId
            const result = await client.query(`
                SELECT p.id, p.date_created, p.user_id, p.content, p.likes_count
                FROM posts p
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