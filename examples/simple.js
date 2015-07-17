//Shows entire HTTP response and its body

"use strict";

let co = require('co');
let request = require('../');

co(function* () {
    let response = yield request('http://google.com');
    let body = response.body;

    console.log('Response: ', response);
    console.log('Body: ', body);
}).catch(function (err) {
    console.err(err);
});
