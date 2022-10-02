const expect  = require('chai').expect;
const assert = require('chai').assert;
const should = require('chai').should();
// const request = require('request');
const auth = require('../src/auth.js')


describe("Login (Module)", function() {
    it('Successful Login (should.be.a)', function() {
        const result = auth.authenticate("john","password")
        result.should.be.a('boolean')
        result.should.equal(true)
    });

    it('Successful Login (expect)', function() {
        const result = auth.authenticate("john","password")
        expect(result).to.be.a('boolean')
        expect(result).to.equal(true)
    });

    it('Successful Login (assert)', function() {
        const result = auth.authenticate("john","password")
        assert.typeOf(result, 'boolean')
        assert.isTrue(result)
    });
    
    it('Failed Login - Username DNE', function() {
        assert.isFalse(auth.authenticate("sal","password"))
    });
    
    it('Failed Login - Wrong Password', function() {
        assert.isFalse(auth.authenticate("joan","password"))
    });    
})
