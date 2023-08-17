/**
 * @param {Object} object
 * @param {string|Array<string>} path
 * @param {*} [defaultValue]
 * @return {*}
 */
function get(object, path, defaultValue) {
  const eachPathArray = Array.isArray(path) ? path : path.split(".");

  let index = 0;
  let copyObject = { ...object };
  let length = eachPathArray.length;

  while (copyObject != null && index < length) {
    copyObject = copyObject[String(eachPathArray[index])];
    index++;
  }

  let value = index && index === length ? copyObject : undefined;
  return value !== undefined ? value : defaultValue;
}
