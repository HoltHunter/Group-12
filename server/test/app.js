const expect  = require('chai').expect;
const assert = require('chai').assert;
const chai = require('chai');
const chaiHttp = require('chai-http');
let app = require('../app')
const setup = require('../src/setup')
const before = require('mocha').before


chai.use(chaiHttp)

const baseUrl = 'http://localhost:8081'

/* NOTE: You must be running the app server for these tests to pass. */

before("setup db", async () => {
    await setup.connect()

    it('Should create a new user.', function(done) {
        chai.request(app)
            .post('/create/newUser', {
                withCredentials: true,
                headers: {"Content-Type": "application/json",}
            })
            .send({"firstName":"Tony","lastName":"Stark","username":"tony@stark.com","password":"ironman"})
            .end((err, res) => {
                assert.equal(200, res.status)
                done()
            })
    });

    it('Should create a new user.', function(done) {
        chai.request(app)
            .post('/create/newUser', {
                withCredentials: true,
                headers: {"Content-Type": "application/json",}
            })
            .send({"firstName":"Steve","lastName":"Rogers","username":"steve@rogers.com","password":"captainamerica"})
            .end((err, res) => {
                assert.equal(200, res.status)
                done()
            })
    });

    it('Should create a new user.', function(done) {
        chai.request(app)
            .post('/create/newUser', {
                withCredentials: true,
                headers: {"Content-Type": "application/json",}
            })
            .send({"firstName":"Thor","lastName":"Odinson","username":"thor@odinson.com","password":"strongestavenger"})
            .end((err, res) => {
                assert.equal(200, res.status)
                done()
            })
    });
})


describe("Login (API)", function() {
    it('Should login.', function(done) {
        chai.request(app)
            .post('/auth/login', {
                withCredentials: true,
                headers: {"Content-Type": "application/json",},
            })
            .send({"username":"tony@stark.com","password":"ironman"})
            .end((err, res) => {
                // console.log(res)
                assert.equal(200, res.status)
                done()
            })
    });
    it('Should logout.', function(done) {
        chai.request(app)
            .post('/auth/logout', {
                withCredentials: true,
                headers: {"Content-Type": "application/json",},
            })
            .end((err, res) => {
                // console.log(res)
                assert.equal(200, res.status)
                done()
            })
    });
})


describe("Search for Users", function() {
    it('Should return a list of users.', function(done) {
        chai.request(app)
            .post('/search/users', {
                withCredentials: true,
                headers: {"Content-Type": "application/json",}
            })
            .send({ userId: 1 })
            .end((err, res) => {
                assert.equal(200, res.status)
                done()
            })
    });
})

describe("Make Friends", function() {
    it('Should create a friend request', function(done) {
        chai.request(app)
            .post('/create/friendRequest', {
                withCredentials: true,
                headers: {"Content-Type": "application/json"}
            })
            .send({ "fromId": 1, "toId": 2 })
            .end((err, res) => {
                assert.equal(200, res.status)
                done()
            })
    })
    it('Should accept a friend request', function(done) {
        chai.request(app)
            .post('/create/acceptFriendRequest', {
                withCredentials: true,
                headers: {"Content-Type": "application/json"}
            })
            .send({ "request_id": 1, "decision": true })
            .end((err, res) => {
                assert.equal(200, res.status)
                done()
            })
    })

    it('Should create a friend request', function(done) {
        chai.request(app)
            .post('/create/friendRequest', {
                withCredentials: true,
                headers: {"Content-Type": "application/json"}
            })
            .send({ "fromId": 1, "toId": 3 })
            .end((err, res) => {
                assert.equal(200, res.status)
                done()
            })
    })
    it('Should accept a friend request', function(done) {
        chai.request(app)
            .post('/create/acceptFriendRequest', {
                withCredentials: true,
                headers: {"Content-Type": "application/json"}
            })
            .send({ "request_id": 2, "decision": true })
            .end((err, res) => {
                assert.equal(200, res.status)
                done()
            })
    })
})


describe("Make Post & Comment", function() {
    it('Should create a post', function(done) {
        chai.request(app)
            .post('/create/newPost', {
                withCredentials: true,
                headers: {"Content-Type": "application/json"}
            })
            .send({ "userId": 2, "postContent": "I am Steve Rogers." })
            .end((err, res) => {
                assert.equal(200, res.status)
                done()
            })
    })
    it('Should comment on the post', function(done) {
        chai.request(app)
            .post('/create/post/comment', {
                withCredentials: true,
                headers: {"Content-Type": "application/json"}
            })
            .send({ "userId": 1, "postId": 1, "comment": "Can you believe this guy?" })
            .end((err, res) => {
                assert.equal(200, res.status)
                done()
            })
    })
    it('Should like the post', function(done) {
        chai.request(app)
            .post('/create/likes', {
                withCredentials: true,
                headers: {"Content-Type": "application/json"}
            })
            .send({ "userId": 3, "postId": 1 })
            .end((err, res) => {
                assert.equal(200, res.status)
                done()
            })
    })
    it('Should share a post', function(done) {
        chai.request(app)
            .post('/create/newPost', {
                withCredentials: true,
                headers: {"Content-Type": "application/json"}
            })
            .send({ "userId": 3, "postContent": "See how the mortals introduce themselves? So formal.", "sharedPostId": 1 })
            .end((err, res) => {
                assert.equal(200, res.status)
                done()
            })
    })
})


describe("View Posts", function() {
    it('View posts', function(done) {
        chai.request(app)
            .post('/search/posts', {
                withCredentials: true,
                headers: {"Content-Type": "application/json"}
            })
            .send({ "userId": 1 })
            .end((err, res) => {
                assert.equal(200, res.status)
                console.log(res.body)
                done()
            })
    })
    it('View post comments', function(done) {
        chai.request(app)
            .post('/search/posts/2/comments/1', {
                withCredentials: true,
                headers: {"Content-Type": "application/json"}
            })
            .end((err, res) => {
                assert.equal(200, res.status)
                console.log(res.body)
                done()
            })
    })
})


describe("Edit user properties", function() {
    it('Should change the icon', function(done) {
        chai.request(app)
            .patch('/settings/1', {
                withCredentials: true,
                headers: {"Content-Type": "application/json"}
            })
            .send({"settings" :{"icon": "bravo"} })
            .end((err, res) => {
                assert.equal("bravo", res.body.icon)
                done()
            })
    })
    it('Should change the theme', function(done) {
        chai.request(app)
            .patch('/settings/2', {
                withCredentials: true,
                headers: {"Content-Type": "application/json"}
            })
            .send({ "settings": {"theme": "dark"} })
            .end((err, res) => {
                assert.equal(200, res.status)
                done()
            })
    })
    it('Should change the icon and theme', function(done) {
        chai.request(app)
            .patch('/settings/3', {
                withCredentials: true,
                headers: {"Content-Type": "application/json"}
            })
            .send({ "settings": {"icon": "gamma", "theme": "monochrome"} })
            .end((err, res) => {
                assert.equal(200, res.status)
                done()
            })
    })
})