const express = require('express')
const authenticate = require('./src/auth.js')
const bodyParser = require('body-parser')

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