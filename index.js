var request = require('request');
var __slice = Array.prototype.slice;

/**
 * Thunkify a request method.
 *
 * @param  {Function} fn
 * @return {Function}
 */
var thunkifyRequestMethod = function (fn) {
  var context = this;

  return function () {
    var args = __slice.call(arguments);

    return function (done) {
      // Concatenate the callback manually to avoid array arguments from co.
      return fn.apply(context, args.concat(function (err, res) {
        done(err, res);
      }));
    };
  };
};

/**
 * Thunkify a request function.
 *
 * @param  {Function} request
 * @return {Function}
 */
var thunkifyRequest = function (request) {
  var fn = thunkifyRequestMethod(request);

  // Regular request methods that don't need be thunkified.
  fn.jar    = request.jar;
  fn.cookie = request.cookie;

  // Attach all request methods.
  ['get', 'patch', 'post', 'put', 'head', 'del'].forEach(function (method) {
    fn[method] = thunkifyRequestMethod.call(request, request[method]);
  });

  return fn;
};

/**
 * Export a thunkified request function.
 *
 * @type {Function}
 */
exports = module.exports = thunkifyRequest(request);

/**
 * Export the Request instance.
 *
 * @type {Function}
 */
exports.Request = request.Request;

/**
 * Export the defaults method and return a thunkified request instance.
 *
 * @return {Function}
 */
exports.defaults = function () {
  return thunkifyRequest(request.defaults.apply(request, arguments));
};

/**
 * Export the forever agent method and return a thunkified request instance.
 *
 * @return {Function}
 */
exports.forever = function () {
  return thunkifyRequest(request.forever.apply(request, arguments));
};
