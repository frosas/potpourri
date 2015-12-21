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
export function promisify(objectOrFunction, func) {
  return (...args) => new Promise((resolve, reject) => {
    toFunction(objectOrFunction, func)(...args, (error, ...values) => {
      error ? reject(error) : resolve(values.length > 1 ? values : values[0]);
    });
  });
}

/**
 * @param {Object|Function} objectOrFunction
 * @param {Function} [func]
 * @return {Function}
 *   toFunction(object, function) → function.bind(object)
 *   toFunction(object, functionName) → object[functionName].bind(object)
 *   toFunction(function) → function
 */
export function toFunction(objectOrFunction, func) {
  if (!func) return objectOrFunction;
  if (typeof func == 'string') return toFunction(objectOrFunction, objectOrFunction[func]);
  return func.bind(objectOrFunction);
}