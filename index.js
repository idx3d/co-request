"use strict";

let request = require("request");
let __slice = Array.prototype.slice;

/**
 * Promisify a request method.
 *
 * @param  {Function} fn
 * @return {Function}
 */
let promisifyRequestMethod = function (fn) {
    let context = this;

    return function () {
        let args = __slice.call(arguments); //Array.from(arguments) is not available.

        return new Promise(function (resolve, reject) {

            // Concatenate the callback manually to avoid array arguments from co.
            return fn.apply(context, args.concat(function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve.apply(this, __slice.call(arguments, 1));
                }
            }));
        });
    }
};

/**
 * Promisify a request function.
 *
 * @param  {Function} request
 * @return {Function}
 */
let promisifyRequest = function (request) {
    let fn = promisifyRequestMethod(request);

    // Regular request methods that don't need be promisified.
    fn.jar    = request.jar;
    fn.cookie = request.cookie;

    // Attach all request methods.
    ["get", "patch", "post", "put", "head", "del"].forEach(function (method) {
        fn[method] = promisifyRequestMethod.call(request, request[method]);
    });

    return fn;
};

/**
 * Export a promisified request function.
 *
 * @type {Function}
 */
exports = module.exports = promisifyRequest(request);

/**
 * Export the Request instance.
 *
 * @type {Function}
 */
exports.Request = request.Request;

/**
 * Export the defaults method and return a promisified request instance.
 *
 * @return {Function}
 */
exports.defaults = function () {
    return promisifyRequest(request.defaults.apply(request, arguments));
};

/**
 * Export the forever agent method and return a promisified request instance.
 *
 * @return {Function}
 */
exports.forever = function () {
    return promisifyRequest(request.forever.apply(request, arguments));
};
