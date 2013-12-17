co-request
==========

Simple wrapper to the request library for co-like interface (node.js generator based code).

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
var co = require('co')
  , request = require('co-request');

co(function* () {
  // You can also pass options object, see http://github.com/mikeal/request docs
  var result = yield request('http://google.com'); 
  var response = result;
  var body = result.body;

  console.log('Response: ', response);
  console.log('Body: ', body);
})();

```

##Gratitude##

Thanks for Tj's [Co library](http://github.com/visionmedia/co)

Thanks for Mikeal's [Request library](http://github.com/mikeal/request)
