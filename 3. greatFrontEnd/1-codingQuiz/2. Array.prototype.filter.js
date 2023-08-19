/**
 * @template T
 * @param {(value: T) => boolean } callbackFn
 * @param {any} [thisArg]
 * @return { Array<T> }
 */

Array.prototype.myFilter = function (callbackFn, thisArg) {
  if (
    typeof callbackFn !== "function" ||
    !callbackFn.call ||
    !callbackFn.apply
  ) {
    throw new TypeError(`${callbackFn} is not a function`);
  }

  const filteringArray = [];
  const thisArrLen = this.length;

  for (let i = 0; i < thisArrLen; i++) {
    if (Object.hasOwn(this, k) && callbackFn.call(thisArg, this[i], i, this)) {
      filteringArray.push(this[k]);
    } else {
      continue;
    }
  }

  return filteringArray;
};

// arguments 의 경우 함수 클로저 내부에 존재하는 객체이다. 함수 내 전달되는 인자들의 집합. arrow, async, generator 의 경우 arguments 에 접근할 수 없다.
// 화살표함수는 this, arguments 의 자체 바인딩이 없다. 그래서 화살표함수는 method 로 사용하는것을 피한다.
