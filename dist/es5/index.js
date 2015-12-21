'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promisify = promisify;
exports.toFunction = toFunction;
/**
 * Converts a node-style function to a promise-style one
 *
 * Example:
 *   const salute = (name, callback) => callback(null, `Hi ${name}`);
 *   promisify(salute)('John').then(salutation => …)); → "Hi John"
 *
 * @param {objectOrFunction} objectOrFunction See `toFunction()`
 * @param {Function} [func] See `toFunction()`
 * @return {Function.<Promise>} In case the node function callback passes multiple
 *   values, the fulfilled promise will pass an array with those values.
 */
function promisify(objectOrFunction, func) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return new Promise(function (resolve, reject) {
      toFunction(objectOrFunction, func).apply(undefined, args.concat([function (error) {
        for (var _len2 = arguments.length, values = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          values[_key2 - 1] = arguments[_key2];
        }

        error ? reject(error) : resolve(values.length > 1 ? values : values[0]);
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