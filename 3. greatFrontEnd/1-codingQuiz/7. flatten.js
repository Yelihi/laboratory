/**
 * @param {Array<*|Array>} value
 * @return {Array}
 */
export default function flatten(value) {
  const isInnerArray = value.some((v) => Array.isArray(v));
  if (!isInnerArray) return value;

  const newArgs = [];
  value.forEach((item) => {
    if (Array.isArray(item)) {
      newArgs.push(...item);
    } else {
      newArgs.push(item);
    }
  });
  return flatten(newArgs);
}
