let chai = require('chai')
let chaiHTTP = require('chai-http')
let app = require('../app')
let should = chai.should

chai.use(chaiHTTP)

describe("Login (Module)", function() {
    it('Should state logged in is false', function(done) {
        chai.request(app)
            .get('/auth/login')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.data.loggedIn.should.equal(false)
                done()
            })
    });

    // it('Successful Login (expect)', function() {
    //     const result = auth.authenticate("john","password")
    //     expect(result).to.be.a('boolean')
    //     expect(result).to.equal(true)
    // });

    // it('Successful Login (assert)', function() {
    //     const result = auth.authenticate("john","password")
    //     assert.typeOf(result, 'boolean')
    //     assert.isTrue(result)
    // });
    
    // it('Failed Login - Username DNE', function() {
    //     assert.isFalse(auth.authenticate("sal","password"))
    // });
    
    // it('Failed Login - Wrong Password', function() {
    //     assert.isFalse(auth.authenticate("joan","password"))
    // });    
})
