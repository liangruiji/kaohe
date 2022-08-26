// @private
var isObject = (value)=>value != null && typeof value === 'object';

/**
 * @private
 * Restores the one-level-depth object to the original nested object.
 *
 * @param  {Array} names: list of keys in the object
 * @param  {any} value: the value of the object to transform
 * @return {Object}
 */
function restoreDepth(names, value) {
    const key = names.shift();
    // determines whether is an index of array
    const obj = (key === '0' || +key) ? [] : {};
    if (names.length) {
        // recursively iterates over properties/items
        obj[key] = restoreDepth(names, value);
    } else {
        obj[key] = value;
    }
    return obj;
}

/**
 * @public
 * Converts a one-level-depth object (`{node-one: value}`)
 * to a nested object (`{node: {one: value}}`)
 *
 * @param  {Object} obj: Object to restore from `toOneLevelDepth`
 * @return {Object}
 */
function fromOneLevelDepth(obj) {
    let key, value, names;
    const newObj = {};
    if (!isObject(obj))
        return obj;
    for (key in obj) {
        value = obj[key];
        names = key.split('-');
        jQuery.extend(true, newObj, restoreDepth(names, value));
        // merge(newObj, restoreDepth(names, value));
        // https://gist.github.com/jherax/05204bdf9eb47eeffdc8
    }
    return newObj;
}
// @private
var isObject = (value)=>value != null && typeof value === 'object';

/**
 * @public
 * Builds one-level-depth object by moving all nested objects to the first level.
 *
 * @param  {Object}  obj: Object to transform
 * @param  {Boolean} lowercase: (Optional) Determines whether the properties should be lowercase
 * @param  {String}  prefix: (Optional) Sets the initial prefix for the object to transform
 * @return {Object}  Object generated with one-level-depth
 */
function toOneLevelDepth(obj, lowercase, ...args) {
    const prefix = args[0];
    const newObj = {};
    let key, value, newKey;
    if (isObject(obj)) {
        // object and array
        for (key in obj) {
            value = obj[key];
            // prevents save empty values
            if (value === '' || value == null)
                continue;
            if (!prefix)
                newKey = key;
            else
                newKey = `${prefix}-${key}`;
            if (lowercase === true)
                newKey = newKey.toLowerCase();
            if (isObject(value)) {
                // objects and arrays
                // recursively iterates over properties/items
                jQuery.extend(true, newObj, toOneLevelDepth(value, lowercase, newKey));
                // merge(newObj, toOneLevelDepth(value, lowercase, newKey));
                // https://gist.github.com/jherax/05204bdf9eb47eeffdc8
            } else {
                newObj[newKey] = value;
            }
        }
        // end for
    }
    // end if
    return newObj;
}
var user = {
    Coverage: 2,
    Applicant: {
        Holder: {
            Birth: "1990/01/01",
            FirstName: "Pepe",
            Gender: 1
        },
        Income: "00",
        Spouse: true
    }
};

// preserve camel-case
var obj1 = toOneLevelDepth(user);

// convert to lower-case
var obj2 = toOneLevelDepth(user, true);

// add the 'hc' prefix
var obj3 = toOneLevelDepth(user, true, 'hc');

console.log(user);
// original object
console.log(obj1);
// preserve camel-case
console.log(obj2);
// convert to lower-case
console.log(obj3);
// add the 'hc' prefix

// restores the object un-nested
var obj4 = fromOneLevelDepth(obj1);

console.log(obj4);
// restored object
console.log(user);
// original object
