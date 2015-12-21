'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promisify = promisify;
exports.toFunction = toFunction;
/**
 * Converts a node-style function to a promise-style one
 *
 * const salute = (name, callback) => callback(null, `Hi ${name}`);
 * promisify(salute)('John').then(salutation => …)); → "Hi John"
 * 
 * @param {objectOrFunction} objectOrFunction See `toFunction()`
 * @param {Function} [func] See `toFunction()`
 * @return {Function.<Promise>}
 */
function promisify(objectOrFunction, func) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return new Promise(function (resolve, reject) {
      toFunction(objectOrFunction, func).apply(undefined, args.concat([function (error, value) {
        error ? reject(error) : resolve(value);
      }]));
    });
  };
}

/**
 * @param {Object|Function} objectOrFunction
 * @param {Function} [func]
 * @return {Function}
 *   toFunction(object, function) → function.bind(object)
 *   toFunction(object, functionName) → object[functionName].bind(object)
 *   toFunction(function) → function
 */
function toFunction(objectOrFunction, func) {
  if (!func) return objectOrFunction;
  if (typeof func == 'string') return toFunction(objectOrFunction, objectOrFunction[func]);
  return func.bind(objectOrFunction);
}