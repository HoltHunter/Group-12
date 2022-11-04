let chai = require('chai')
let chaiHTTP = require('chai-http')
let app = require('../app')
let should = chai.should
const assert = require('chai').assert;

chai.use(chaiHTTP)

describe("Login (Module)", function() {
    it('Should create a new user.', function(done) {
        const reqBody = JSON.stringify({"firstName":"Tony","lastName":"Stark","username":"tony@stark.com","password":"ironman"})
        chai.request(app)
            .post('/create/newUser', reqBody, {
                withCredentials: true,
                headers: {"Content-Type": "application/json",}
            })
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
