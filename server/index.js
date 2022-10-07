const express = require("express");     //import express
const {Server} = require("socket.io");  //instance of a potential server for web socket requests
const app = express();                  //instantiate application using express app initializer
const helmet = require("helmet");       //helmet provides additional security
const cors = require("cors");
const authRouter = require("./authRouter");
const session = require("express-session");
const server = require("http").createServer(app);   //listen for http requests and is passed through the express application
const pool = require('./db')

require("dotenv").config();

//web server that socket io is hosted on
const io = new Server(server, {
    //specify which domain this server will be talking to
    cors: {
        //location of application server front end
        origin: "http://localhost:3000",
        //cross site cookies sent over
        credentials: "true",
    },
});

app.use(helmet());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))
app.use(express.json()); //parses JSON via express server, utilize as JS object

app.get("/", (req, res) => {
    res.json("server is running...");
});

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

//Session
app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      credentials: true,
      name: "sid",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.ENVIRONMENT === "production" ? "true" : "auto",
        httpOnly: true,
        expires: 1000 * 60 * 60 * 24 * 7,
        sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
      },
    })
  );

app.use("/auth", authRouter);

app.post('/test', function (req, res) {
	console.log("connected");
	res.redirect("/test");
})

//socket recieves a connection and runs the callback
io.on("connect", socket => {});

//listening on port 5000
server.listen(5000, () => {
    console.log("Server listening on port 5000")
});