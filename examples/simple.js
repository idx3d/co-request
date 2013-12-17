var co = require('co')
  , request = require('../');

co(function* () {
  var result = yield request('http://google.com');
  var response = result;
  var body = result.body;

  console.log('Response: ', response);
  console.log('Body: ', body);
})();
