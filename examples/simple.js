//Shows entire HTTP response and its body

var co = require('co')
  , request = require('../');

co(function* () {
  var response = yield request('http://google.com');
  var body = response.body;

  console.log('Response: ', response);
  console.log('Body: ', body);
})();
