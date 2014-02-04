//Shows thunked methods in acion (se moore at https://github.com/mikeal/request/blob/master/README.md)

var co = require('co')
  , request = require('../');

co(function* () {
  //Get method
  var getResponse = yield request.get('http://nodejs.org');
  var body = getResponse.body;

  console.log('Get Response: ', getResponse);
  console.log('Get Body: ', body);
  
  //Post method
  var postResponse = yield request.post('http://nodejs.org');
  
  console.log('Post Response: ', postResponse);

})();
