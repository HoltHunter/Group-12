const expect  = require('chai').expect;
const assert = require('chai').assert;
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp)

const baseUrl = 'http://localhost:8080'

/* NOTE: You must be running the app server for these tests to pass. */

describe("Login (API)", function() {
    it('Successful Login', function() {
        const params = { username: "john", password: "password" }
        
        chai.request(baseUrl)
            .post('/login')
            .send(params)
            .end((err, res) => {
                res.text.should.be.a('string')
                res.text.should.equal("welcome, john")
            })
    });

    it('Failed Login - Username DNE', function() {
        const params = { username: "sal", password: "password" }
        
        chai.request(baseUrl)
            .post('/login')
            .send(params)
            .end((err, res) => {
                res.text.should.be.a('string')
                res.text.should.equal("No entry for you, villain.")
            })
    });
        
    it('Failed Login - Wrong Password', function() {
        const params = { username: "john", password: "wordpass" }
        
        chai.request(baseUrl)
            .post('/login')
            .send(params)
            .end((err, res) => {
                res.text.should.be.a('string')
                res.text.should.equal("No entry for you, villain.")
            })
    });
})
