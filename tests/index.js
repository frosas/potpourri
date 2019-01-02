const {promisify, toFunction} = require('../src/index');
const mocha = require('mocha');
const assert = require('assert');

describe("promisify()", () => {
  it("passes arguments and callback", done => {
    const func = (a, callback) => {
      assert.equal(a, 'a');
      assert(callback instanceof Function);
      done();
    };
    promisify(func)('a');
  });
  
  it("returns a fulfilled promise out of a succeeding node function", () => {
    const func = callback => callback(null, 'a');
    return promisify(func)().then(value => assert.equal(value, 'a'));
  });
    
  it("returns a rejected promise out of a failing node function", () => {
    const error = new Error;
    const func = callback => callback(error);
    return promisify(func)().catch(_error => assert.equal(_error, error));
  });
  
  it("returns all callback values as an array if more than one", done => {
    promisify(callback => callback(null, 'a', 'b'))().then(values => {
      assert.deepEqual(values, ['a', 'b']);
      done();
    });
  });
});

describe("toFunction()", () => {
  it("normalizes an object and a method", done => {
    const object = {
      func() { assert.equal(this, object); done(); }
    };
    toFunction(object, object.func)();
  });
  
  it("normalizes an object and a method name", done => {
    const object = {
      func() { assert.equal(this, object); done(); }
    };
    toFunction(object, 'func')();
  });
  
  it("normalizes a function", () => {
    const func = function() {};
    assert.equal(toFunction(func), func);
  });
});