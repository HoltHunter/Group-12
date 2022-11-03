const express = require("express");
const router = express.Router();
const Yup = require("yup");
const pool = require("../src/db");
//const bcrypt = require("bcrypt");

router
    .post('/newUser', async (req, res) => {
		const client = await pool.connect()
		try {
			const first_name = req.body.firstName
			const last_name = req.body.lastName
			const username = req.body.username
			const password = req.body.password
			await client.query(`
				INSERT INTO users (first_name, last_name, username, password) 
				VALUES('${first_name}', '${last_name}', '${username}', '${password}');
			`)
			res.statusCode = 200
			res.send()
		} catch (err) {
			console.log(err.stack)
		} finally {
			client.release()
		}
    })
    .post('/friendRequest', async (req, res) => {
		const client = await pool.connect()
		try {
			const from_id = req.body.fromId
			const to_id = req.body.toId
			const result = await client.query(`
				INSERT INTO friend_requests (user_id, request_from_id) 
				VALUES('${to_id}', '${from_id}');
			`)
			res.send("Success")
		} catch (err) {
			console.log(err.stack)
		} finally {
			client.release()
		}
    })
    .post('/acceptFriendRequest', async (req, res) => {
		const client = await pool.connect()
		try {
			const decision = req.body.decision
			const request_id = req.body.request_id
			await client.query(`
				UPDATE friend_requests 
				SET decision = ${decision}
				WHERE id = ${request_id};
			`)
			if (decision == true) {
				let result = await client.query(`SELECT * FROM friend_requests WHERE id = ${request_id}`)
				result.rows[0].user_id < result.rows[0].request_from_id 
					? result = [result.rows[0].user_id, result.rows[0].request_from_id]
					: result = [result.rows[0].request_from_id, result.rows[0].user_id]
				await client.query(`
					INSERT INTO friends (user_id, other_user_id) 
					VALUES('${result[0]}', '${result[1]}');
				`)	
			}
			res.send("Success")
		} catch (err) {
			console.log(err.stack)
		} finally {
			client.release()
		}
    })
	.post('/newPost', async (req, res) => {
		const client = await pool.connect()
		try {
			const user_id = req.body.userId
			const post_content = req.body.postContent
			if (req.body.sharedPostId) {
				await client.query(`
					INSERT INTO posts (user_id,content,likes_count,shared_post_id)
					VALUES(${user_id},'${post_content}',0, ${ req.body.sharedPostId });
				`)
			} else {
				await client.query(`
					INSERT INTO posts (user_id,content,likes_count)
					VALUES(${user_id},'${post_content}',0);
				`)
			}
			
			res.send("Success")
		} catch (err) {
			console.log(err.stack)
		} finally {
			client.release()
		}
    })
	.post('/post/comment', async (req, res) => {
		const client = await pool.connect()
		try {
			const user_id = req.body.userId
			const post_id = req.body.postId
			const comment = req.body.comment
			const result = await client.query(`
				INSERT INTO post_comments (user_id, post_id, content)
				VALUES(${user_id}, ${post_id}, '${comment}');
			`)
			res.send("Success")
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
	.post('/posts/:id', async (req, res) => {
		const client = await pool.connect()
		try {
			const post_content = req.body.postContent
			let { id } = req.params   // Pull id from URL parameter
			
			await client.query(`
				UPDATE posts
				SET content = '${ post_content }'
				WHERE id = ${ id }
				;
			`)
			
			res.send("Success")
		} catch (err) {
			console.log(err.stack)
		} finally {
			client.release()
		}
    })

module.exports = router;