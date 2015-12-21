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
export function promisify(objectOrFunction, func) {
  return (...args) => new Promise((resolve, reject) => {
    toFunction(objectOrFunction, func)(...args, (error, value) => {
      error ? reject(error) : resolve(value);
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