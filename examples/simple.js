var co = require('co')
  , request = require('../')

co(function* () {
  var data = yield request('http://google.com');
  var response = data[0];
  var body = data[1];

  console.log(response);
  console.log(body);
});
