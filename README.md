co-request
==========

Simple wrapper to the request library for co-like interface (node.js generator based code).
You can use it with koa or co

To install simply run:
```bash
npm install co-request
```

Require co first, also it will work on node v0.11.7 and newest only.

You must run node with --harmony flag (--harmony-generators as well)

```bash
node --harmony simple.js
```

Simple example:

```js
"use strict";

let co = require("co");
let request = require("co-request");

co(function* () {
  // You can also pass options object, see http://github.com/mikeal/request docs
    let result = yield request("http://google.com"); 
    let response = result;
    let body = result.body;

    console.log("Response: ", response);
    console.log("Body: ", body);
}).catch(function (err) {
    console.err(err);
});
```

POST example:

```js
"use strict";

co(function* () {
    let result = yield request({
        uri: "http://google.com",
        method: "POST"
    });
})();
```

To pipe request you should use small helper (thanks to [greim](https://github.com/greim)):

```js
function pipeRequest(readable, requestThunk){
  return function(cb){
    readable.pipe(requestThunk(cb));
  }
}

//..and then:

  var value = yield pipeRequest(this.req, request({...}));
```

All methods of request listed in [Request docs](https://github.com/mikeal/request/blob/master/README.md)

##Gratitude##

Thanks for Tj's [Co library](http://github.com/visionmedia/co)

Thanks for Mikeal's [Request library](http://github.com/mikeal/request)
