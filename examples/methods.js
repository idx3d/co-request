//Shows thunked methods in acion (se moore at https://github.com/mikeal/request/blob/master/README.md)

"use strict";

let co = require('co');
let request = require('../');

co(function* () {
  //Get method
  let getResponse = yield request.get('http://nodejs.org');
  let body = getResponse.body;

  console.log('Get Response: ', getResponse);
  console.log('Get Body: ', body);

  //Post method
  let postResponse = yield request.post('http://nodejs.org');

  console.log('Post Response: ', postResponse);

}).catch(function (err) {
    console.err(err);
});
