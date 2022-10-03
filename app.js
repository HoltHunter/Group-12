const express = require('express')
const authenticate = require('./src/auth.js')
const bodyParser = require('body-parser')
const { Pool, Client } = require('pg')
const setup = require('./src/setup.js')

// THIS IS ONE EXAMPLE OF HOW WE CAN CONNECT TO THE DB
// IT WAS WRITTEN TO RUN THE MIGRATIONS, BEFORE I MOVED THAT
// CODE TO setup.js. 
// const pool = new Pool({
// 	database: "cse_database",
// 	user: "cse_username",
// 	password: "cse_password",
// 	host: "localhost",
// 	port: 5432,
// 	ensureDatabaseExists: true,
// 	defaultDatabase: "postgres-cse"
// })
// const client = new Client(pool)
// await client.connect()
// try {
	// setup.connect(pool, "./migrations")
// } finally {
	// client.end()
// }

setup.connect()


const app = express()
const jsonParser = bodyParser.json()

const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function (req, res) {
    console.log(req.body)
	res.send('Hello World')
})

app.post('/login', jsonParser, function (req, res) {
	if (authenticate.authenticate(req.body.username, req.body.password)) {
		res.send('welcome, ' + req.body.username)
	} else {
		res.send('No entry for you, villain.')
	}
})

app.listen(8080, function () {
    console.log('App listening on port 8080!')
})