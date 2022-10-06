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

app.post('/login', jsonParser, function (req, res) {
	if (authenticate.authenticate(req.body.username, req.body.password)) {
		res.send('welcome, ' + req.body.username)
	} else {
		res.send('No entry for you, villain.')
	}
})

app.listen(8000, function () {
    console.log('App listening on port 8000!')
})