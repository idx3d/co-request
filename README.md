co-request
==========

Simple wrapper to the request library for co-like interface (node.js generator based code).


Require co first, also it will work on node v0.11.7 and newest only.

You must run node with --harmony flag (--harmony-generators as well)

```bash
node --harmony simple.js
```

Simple example:

```js
var co = require('co')
  , request = require('co-request');

co(function* () {
  // You can also pass options object, see ttp://github.com/mikeal/request docs
  var data = yield request('http://google.com'); 
  // yielded request call returns array of [response, body]
  var response = data[0];
  var body = data[1];

  console.log(response);
  console.log(body);
});

```

##Gratitude##

Thanks for Tj's [Co library](http://github.com/visionmedia/co)

Thanks for Mikeal's [Request library](http://github.com/mikeal/request)
