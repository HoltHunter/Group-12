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
			const result = await client.query('SELECT * FROM users')
			res.send(result.rows)
		} catch (err) {
			console.log(err.stack)
		} finally {
			client.release()
		}
	})()
})


// MARK: - POST
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
			res.send("Success")
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

app.post('/login', jsonParser, function (req, res) {
	if (authenticate.authenticate(req.body.username, req.body.password)) {
		res.send('welcome, ' + req.body.username)
	} else {
		res.send('No entry for you, villain.')
	}
})


// MARK: - LISTEN
app.listen(8080, function () {
    console.log('App listening on port 8080!')
})