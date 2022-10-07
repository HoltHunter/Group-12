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
				VALUES('${from_id}', '${to_id}');
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
			if (decision === 'true') {
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

module.exports = router;