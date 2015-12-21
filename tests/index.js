import {promisify, toFunction} from '../es5';
import mocha from 'mocha';
import assert from 'assert';

describe("promisify()", () => {
  it("passes arguments and callback", done => {
    const func = (a, callback) => {
      assert.equal(a, 'a');
      assert(callback instanceof Function);
      done();
    };
    promisify(func)('a');
  });
  
  it("promisifies a succeeding node function", () => {
    const func = callback => callback(null, 'a');
    return promisify(func)().then(value => assert.equal(value, 'a'));
  });
    
  it("promisifies a failing node function", () => {
    const error = new Error;
    const func = callback => callback(error);
    return promisify(func)().catch(_error => assert.equal(_error, error));
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