const express = require('express')
const authenticate = require('./src/auth.js')
const bodyParser = require('body-parser')
const { Pool, Client } = require('pg')
const setup = require('./src/setup.js')

setup.connect()

const app = express()
const jsonParser = bodyParser.json()

const urlencodedParser = bodyParser.urlencoded({ extended: false })

const pool = new Pool({
	database: "cse_database",
	user: "cse_username",
	password: "cse_password",
	host: "localhost",
	port: 5432,
	ensureDatabaseExists: true,
	defaultDatabase: "postgres-cse"
})

// MARK: - GET 
app.get('/', function (req, res) {
	res.send('Hello World')
})

app.get('/users', (req, res) => {
	(async () => {
		const client = await pool.connect()
		try {
			const result = await client.query(`
				SELECT u.id, u.first_name, u.last_name 
				FROM users u
			`)
			res.send(result.rows)
		} catch (err) {
			console.log(err.stack)
		} finally {
			client.release()
		}
	})()
})

// MARK: - POST - SEARCH 
app.post('/searchUsers', jsonParser, (req, res) => {
	(async () => {
		const client = await pool.connect()
		try {
			const userId = Number(req.body.userId)
			const result = await client.query(`
				SELECT u.id, u.first_name, u.last_name, 
					CASE WHEN ((f.user_id = ${ userId } OR f.other_user_id = ${ userId })
					OR (f2.other_user_id = ${ userId } OR f2.user_id = ${ userId })) 
						THEN 'true' ELSE 'false' END 
				FROM users u 
				LEFT JOIN friends f ON u.id = f.other_user_id 
				LEFT JOIN friends f2 ON u.id = f2.user_id 
				WHERE u.id != ${ userId }
				;
			`)
			res.send(result.rows)
		} catch (err) {
			console.log(err.stack)
		} finally {
			client.release()
		}
	})()
})

app.post('/searchFriendRequests', jsonParser, (req, res) => {
	(async () => {
		const client = await pool.connect()
		try {
			const userId = Number(req.body.userId)
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
	})()
})


// MARK: - POST - CREATE
app.post('/createUser', jsonParser, function (req, res) {
	(async () => {
		const client = await pool.connect()
		try {
			const first_name = req.body.firstName
			const last_name = req.body.lastName
			const username = req.body.username
			const password = req.body.password
			const result = await client.query(`
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
	})()
})

app.post('/requestFriend', jsonParser, function (req, res) {
	(async () => {
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
	})()
})


app.post('/acceptFriend', jsonParser, function (req, res) {
	(async () => {
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
	})()
})

// MARK: POST - LOGIN
app.post('/login', jsonParser, function (req, res) {
	(async () => {
		const client = await pool.connect()
		try {
			const username = req.body.username
			const password = req.body.password
			const result = await client.query(`
				SELECT * 
				FROM users 
				WHERE username = '${username}' 
				AND password = '${password}';
			`)
			console.log(result.rows)
			console.log(result.rows.length)
			console.log(result.rows.length === 1)
			if (result.rows.length === 1) {
				res.statusCode = 200
				res.send()
			} else {
				res.statusCode = 403
				res.send()
			}
		} catch (err) {
			console.log(err.stack)
		} finally {
			client.release()
		}
	})()
})


// MARK: - LISTEN
app.listen(8080, function () {
    console.log('App listening on port 8080!')
})