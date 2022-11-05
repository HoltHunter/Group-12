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
})


describe("Login (API)", function() {
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
            .get('/search/users', {
                withCredentials: true,
                headers: {"Content-Type": "application/json",}
            })
            .end((err, res) => {
                assert.equal(200, res.status)
                console.log(res.body)
                done()
            })
    });
})