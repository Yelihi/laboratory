Array.prototype.myReduce = function (callbackFn, initialValue) {
  if (
    typeof callbackFn !== "function" ||
    !callbackFn.call ||
    !callbackFn.apply
  ) {
    throw new TypeError(`${callbackFn} is not a function`);
  }

  const noInitailValue = initialValue === undefined;
  const len = this.length;

  if (noInitailValue && len === 0) {
    throw new TypeError("Reduce of Empty array with no initial value");
  }

  let acc = noInitailValue ? this[0] : initialValue;
  let startingIndex = noInitailValue ? 1 : 0;

  for (let i = startingIndex; i < len; i++) {
    if (Object.hasOwn(this, i)) {
      acc = callbackFn(acc, this[i], i, this);
    }
  }

  return acc;
};
