/**
 * Checks if given data is an object
 * @param {*} item  data in question
 * @return {Boolean}
 */
function isObject(item) {
  return Object.prototype.toString.call(item) === '[object Object]';
}

/**
 * Checks if given object is empty (no properties)
 * @param {Object} obj  Object in question
 * @return {Boolean}
 */
function isEmpty(obj) {
  if (!isObject(obj)) return false;
  for (var key in obj) {
    // if(obj.hasOwnProperty(key))
    if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
  }
  return true;
}

export { isObject, isEmpty };
