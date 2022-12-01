const express = require("express") // import express
const { Server } = require("socket.io") // instance of a potential server for web socket requests
const helmet = require("helmet") // helmet provides additional security
const cors = require("cors")
const session = require("express-session")

const bodyParser = require("body-parser")
const setup = require("./src/setup.js")

const app = express() // instantiate application using express app initializer
const server = require("http").createServer(app) // listen for http requests and is passed through the express application
const pool = require("./src/db")

const authRouter = require("./routes/authRouter")
const searchRouter = require("./routes/searchRouter")
const createRouter = require("./routes/createRouter")

setup.connect()

require("dotenv").config()

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))
app.use(express.json()) // parses JSON via express server, utilize as JS object

app.get("/", (req, res) => {
    res.json("server is running...")
})

// Session
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
    }),
)

app.use("/auth", authRouter)
app.use("/search", searchRouter)
app.use("/create", createRouter)

// listening on port 5000
server.listen(8081, () => {
    console.log("Server listening on port 8081")
})

module.exports = app
