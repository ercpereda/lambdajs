/***
 * Returns the first item of the array.
 *
 * Example
 *  `head([3, 2, 1]) // -> 3`
 ***/
const head = ([x]) => x;

/***
 * Returns all but the first item of the array.
 *
 * Example
 *  `tail([3, 2, 1]) // -> [2, 1]`
 ***/
const tail = ([,...xs]) => xs;

/***
 * Returns if the argument is defined.
 *
 * Example
 *  ```
 *  const x = 0;
 *  def(x) // -> true
 *  def(y) // -> false
 *  ```
 ***/
const def = x => typeof x !== 'undefined';

/***
 * Returns if the argument is undefined.
 *
 * Example
 *  ```
 *  const x = 0;
 *  undef(x) // -> false
 *  undef(y) // -> true
 *  ```
 ***/
const undef = x => !def(x);

/***
 * Returns a new copy of an array.
 *
 * Example
 *  ```
 *  const a = [1, 2, 3]
 *  copy(a) // -> [1, 2, 3];
 *  ```
 ***/
const copy = array => [...array];

/***
 * Returns the length of an array.
 *
 * Example
 * `length([1, 2, 3]) // -> 3`
 *
 * Note: The `len` param avoid tail recursion.
 ***/
const length = ([x, ...xs], len = 0) => def(x) ? length(xs, len + 1) : len;

/***
 * Returns a reversed array
 *
 * Example
 *  `reverse([3, 2, 1]) // -> [1, 2, 3]`
 ***/
const reverse = ([x, ...xs]) => def(x) ? [...reverse(xs), x] : [];

/***
 * Returns a new array that contains the first `n` items of the given array.
 * 
 * Example
 *  `first([1, 2, 3, 4, 5], 3) // -> [1, 2, 3]`
 ***/
const first = ([x, ...xs], n = 1) => def(x) && n > 0 ? [x, ...first(xs, n - 1)] : [];

/***
 * Returns a new array that contains the last `n` items of the given array.
 *
 * Example
 *  `last([1, 2, 3, 4, 5], 3) // -> [3, 4, 5]`
 ***/
const last = (xs, n = 1) => reverse(first(reverse(xs), n));

/***
 * Returns a new array with a value inserted in a given index.
 *
 * Example
 *  `slice([1, 2, 3, 4], 2, 5) // -> [1, 2, 5, 3, 4]`
 ***/
const slice = ([x, ...xs], i, y, curr = 0) => def(x)
  ? curr === i
    ? [y, x, ...slice(xs, i, y, curr + 1)]
    : [x, ...slice(xs, i, y, curr + 1)]
  : [];

/***
 * Returns if the argument is an array.
 *
 * Example
 *  `isArray([1]) // -> true`
 ***/
const isArray = x => Array.isArray(x);

/***
 * Combines nested arrays into a single array.
 *
 * Example
 *  `flatten([[1, 2, 3], [4, [5, [6]]]]) // -> [1, 2, 3, 4, 5, 6]`
 ***/
const flatten = ([x, ...xs]) => def(x)
  ? isArray(x)
    ? [...flatten(x), ...flatten(xs)]
    : [x, ...flatten(xs)]
  : [];

/***
 * Returns a new array with the result of the provided function called on every element.
 *
 * Example
 *  `map([1, 2, 3], x => x * x) // -> [1, 4, 9]`
 ***/
const map = ([x, ...xs], fn) => def(x)
  ? [fn(x), ...map(xs, fn)]
  : [];

/***
 * Returns a new array with two items swapped based on their index.
 *
 * Example
 *  `swap([1, 2, 3, 4], 1, 3) // -> [1, 4, 3, 2]` 
 ***/
const swap = (a, i, j) => map(a, (x, y) => {
  if (y === i) { return a[j]; };
  if (y === j) { return a[i]; };
  return x;
});

/***
 * Returns a new array with all the elements that satisfy the predicate.
 *
 * Example
 *  `filter([1, 2, 3], x => x % 2 === 0) // -> [2]`
 ***/
const filter = ([x, ...xs], fn) => def(x)
  ? fn(x)
    ? [x, ...filter(xs, fn)]
    : [...filter(xs, fn)]
  : [];

/***
 * Returns a new array with all the elements that does not satisfy the predicate.
 *
 * Example
 *  `filter([1, 2, 3], x => x % 2 === 0) // -> [1, 3]`
 ***/
const reject = ([x, ...xs], fn) => def(x)
  ? !fn(x)
    ? [x, ...reject(xs, fn)]
    : [...reject(xs, fn)]
  : [];

/***
 * Splits an array into two arrays. One whose items satisfy a predicate and one whose does not.
 *
 * Example
 *  `partition([1, 2, 3], x => x % 2 === 0 // -> [[2], [1, 3]]`
 ***/
const partition = (xs, fn) => [filter(xs, fn), reject(xs, fn)];

/***
 * Applies a function against an accumulator and each elment in the array (from left to rigth) to reduce it to a single value.
 *
 * Example
 *  `reduce([1, 2, 3], 0, (acc, x) => acc + x) // -> 6
 ***/
const reduce = ([x, ...xs], fn, acc, i = 0) => def(x)
  ? reduce(xs, fn, fn(acc, x, i), i+1)
  : acc;

/***
 * Applies a function against an accumulator and each elment in the array (from right to left) to reduce it to a single value.
 *
 * Example
 *  `reduceRight([1, 2, 3], 0, (acc, x) => acc + x) // -> 6
 ***/
const reduceRight = (xs, fn, acc, i = 0) => reduce(reverse(xs), fn, acc, i);

/***
 * Partially apply a function by filling in any number of its arguments.
 *
 * Example
 *  ```
 *  const add = (x, y) => x + y
 *  const plus2 = partial(add, 2)
 *  add2(10) // -> 12
 *  ```
 ***/
const partial = (fn, ...args) => (...newArgs) => fn(...args, ...newArgs);

/***
 * Convert function that takes an array to one that takes multiple arguments.
 *
 * Example
 * ```
 * const sum([x, ...xs]) = def(x) ? parseInt(x + add(xs)) : [];
 * const sum([1, 2, 3]) // -> 6
 * const spreadSum = spreadArg(add)
 * const spreadSum(1, 2, 3) // -> 6
 * ```
 ***/
const spreadArg = fn => (...args) => fn(args);

/***
 * Reverse function argument order.
 *
 * Example
 * ```
 * const divide = (x, y) => x / y
 * divide(100, 10) // -> 10
 * const percentToDec = partial(reverseArgs(divide), 100);
 * percentToDec(25) // -> 0.25
 ***/
const reverseArgs = fn => (...args) => fn(...reverse(args))

 /***
  * Extract property from array.
  *
  * Example
  * ```
  * const getPrices = partial(pluck, 'price'); 
  * const products = [
  *   {price: 10},
  *   {price: 5},
  *   {price: 1},
  * ];
  * map(products, getPrices) // -> [10, 5, 1]
  * ```
  ***/
const pluck = (key, object) => object[key];

/***
 * Each function gets the return value from the previous function.
 *
 * Example
 * ```
 * const getPrice = partial(pluck, 'price')
 * const discount = x => x * 0.9
 * const tax = x => x + (x * 0.075)
 * const getFinalPrice = flow(getPrice, discount, tax)
 * const products = [
  *   {price: 10},
  *   {price: 5},
  *   {price: 1},
  * ];
  * map(products, getFinalPrice) // -> [9.675, 4.8375, 0.9675]
  * ```
  ***/
const flow = (...args) => x => reduce(args, (acc, fn) => fn(acc), x);

/***
 * Each function gets the return value from the next function.
 *
 * Example
 * ```
 * const getPrice = partial(pluck, 'price')
 * const discount = x => x * 0.9
 * const tax = x => x + (x * 0.075)
 * const getFinalPrice = flow(tax, discount, getPrice)
 * const products = [
  *   {price: 10},
  *   {price: 5},
  *   {price: 1},
  * ];
  * map(products, getFinalPrice) // -> [9.675, 4.8375, 0.9675]
  * ```
  ***/
const compose = (...args) => flow(...reverse(args));

/***
 * Returns the smallest number in an array and `Infinity` if the array is empty.
 *
 * Example
 * `min([3, 1, 2]) // -> 1`
 ***/
const min = ([x, ...xs], result = Infinity) => def(x)
  ? x < result
    ? min(xs, x)
    : result
  : result;

/***
 * Returns the largest number in an array and `-Infinity` if the array is empty.
 *
 * Example
 * `max([3, 1, 2]) // -> 3`
 ***/
const max = ([x, ...xs], result = -Infinity) => def(x)
  ? x > result
    ? max(xs, x)
    : result
  : result;

/***
 * Sort an array from smallest to largest using *Quicksort* algorithm.
 *
 * Example
 * `quicksort([5, 2, 4, 3, 1]) // -> [1, 2, 3, 4, 5]`
 ***/
const quicksort = xs => length(xs)
  ? flatten([
    quicksort(filter(tail(xs, x => x <= head(xs)))),
    head(xs),
    quicksort(filter(tail(xs, x => x > head(xs)))),
  ])
  : [];

module.exports = {
  head,
  tail,
  def,
  undef,
  copy,
  length,
  reverse,
  first,
  last,
};
