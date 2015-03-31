var request = require('../');
var co = require('co');

var assert = require('chai').assert;
var nock = require('nock');

describe('get', function() {
  describe('json body', function() {
    var server = nock("http://example.com")
      .persist()
      .get("/")
      .reply(200, {key: 'value'});

    it('should allow passing options', function(done) {
      co(function* () {
        var result = yield request.get({ url: "http://example.com/" });
        assert.equal(result.statusCode, 200);
        assert.isObject(result);
        assert.isString(result.body);
        assert.equal(result.body, '{"key":"value"}');
        done();
      })();
    });

    it('should get the json body as a string', function(done) {
      co(function* () {
        var result = yield request("http://example.com/");
        assert.equal(result.statusCode, 200);
        assert.isObject(result);
        assert.isString(result.body);
        assert.equal(result.body, '{"key":"value"}');
        done();
      })();
    })

    it('should get the json body as an object', function(done) {
      co(function* () {
        var result = yield request({
          url: "http://example.com/",
          json: true
        });
        assert.equal(result.statusCode, 200);
        assert.isObject(result);
        assert.isObject(result.body);
        assert.deepEqual(result.body, {key:"value"});
        done();
      })();
    })
  })

  describe('error response', function() {
    it('should handle 404 error', function(done) {
      var server = nock("http://example.com")
        .get("/notfound")
        .reply(404);
      co(function* () {
        var result = yield request("http://example.com/notfound");
        assert.equal(result.statusCode, 404);
        assert.isObject(result);
        assert.isString(result.body);
        assert.equal(result.body, '');
        done();
      })();
    })

    it('should throw exceptions', function(done) {
      co(function* () {
      try {
        yield request("invalid url");
      } catch(err) {
        assert.match(err.message, /Invalid URI/);
      }

      done();
      })();
    })
  })
});
