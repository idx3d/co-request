var request = require('request');
var __slice = Array.prototype.slice;

/**
 * Thunkify a request method.
 *
 * @param  {Function} fn
 * @return {Function}
 */
var thunkifyRequest = function (fn) {
  return function () {
    var args    = __slice.call(arguments);
    var context = this;

    return function (done) {
      // Push the callback manually to avoid additional arguments from co.
      args.push(function (err, res) {
        done(err, res);
      });

      return fn.apply(context, args);
    };
  };
};

/**
 * Export the thunkified base request function.
 *
 * @type {Function}
 */
exports = module.exports = thunkifyRequest(request);

// Regular request methods that don't need be thunkified.
exports.jar    = request.jar;
exports.cookie = request.cookie;

// Attach all the regular request methods.
['get', 'patch', 'post', 'put', 'head', 'del'].forEach(function (method) {
  exports[method] = thunkifyRequest(request[method]);
});
