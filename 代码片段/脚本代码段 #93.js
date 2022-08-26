function memoize(func) {
  const cache = {};
  return function memoized(...args) {
    const key = JSON.stringify(args);
    if (key in cache) return cache[key];
    return (cache[key] = func(...args));
  };
}

function memoizeTest(func) {
  var cache = {};
  return function memoized() {
    var key = JSON.stringify(Array.prototype.slice.call(arguments));
    if (!(key in cache)) cache[key] = func.apply(this, arguments);
    console.log('cache:', cache); // remove this
    return cache[key];
  };
}

/**
 * LIMITATIONS
 *
 * As memoize is a higher-order function that accepts a function as its argument
 * and returns a memoized version of the function, it is perfect to work with
 * pure functions because of the Referential transparency, but it is not good
 * for a function that modifies itself, e.g. Lazy function definition.
 */

/**
 * Return the value of the number 'x' to the power of 2
 */
function maxPow999(x) {
  const result = x ** 2;
  if (result >= 999) {
    // function is redefined
    maxPow999 = () => result;
  }
  return result;
}

// creates the memoized version
maxPow999 = memoizeTest(maxPow999);

maxPow999(30); // creates the index "[30]" and returns 900
maxPow999(31); // creates the index "[31]" and returns 961

// this call redefines the function, overwriting the memoized version
maxPow999(32); // creates the index "[32]" and returns 1024

// these calls are no longer using the cache, because
// it was redefined as maxPow999 = () => result;
maxPow999(30); // => 1024
maxPow999(15); // => 1024

function pow(a, b) {
  return a ** b;
}

// creates the memoized version
pow = memoize(pow);

pow(3, 5); // creates the index "[3,5]" and returns 243
pow(6, 2); // creates the index "[6,2]" and returns 36

pow(3, 5); // return the cached result at "[3,5]"