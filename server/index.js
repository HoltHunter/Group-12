const express = require("express");     //import express
const {Server} = require("socket.io");  //instance of a potential server for web socket requests
const app = express();                  //instantiate application using express app initializer
const helmet = require("helmet");       //helmet provides additional security


const server = require("http").createServer(app);   //listen for http requests and is passed through the express application

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
app.use(express.json()); //parses JSON via express server, utilize as JS object

app.get("/", (req, res) => {
    res.json("hi");
});

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