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


// 다른 풀이

export default function flatten(value) {
  const res = [];
  const copy = value.slice();

  while (copy.length) {
    const item = copy.shift();
    if (Array.isArray(item)) {
      copy.unshift(...item);
    } else {
      res.push(item);
    }
  }

  return res;
}


export default function flatten(value) {
  while (value.some(Array.isArray)) {
    value = [].concat(...value);
  }

  return value;
}

export default function flatten(value) {
  return value.reduce(
    (acc, curr) => acc.concat(Array.isArray(curr) ? flatten(curr) : curr),
    [],
  );
}

export default function flatten(value) {
  return Array.isArray(value) ? value.flatMap((item) => flatten(item)) : value;
}


export default function flatten(arr) {
  return arr.flat(Infinity);
}