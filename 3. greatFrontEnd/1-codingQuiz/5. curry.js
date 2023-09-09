/**
 * @param {Function} func
 * @return {Function}
 */

export default function curry(func) {
  return function innerCurry(...args) {
    if (args.length === func.length) {
      // 콜백 함수의 인자길이 접근
      return func.apply(this, args); // innerCurry 로 전달된 args 를 func 에 전달하여 실행함.
    }

    return (arg) =>
      arg !== undefined // 인자를 추가하였다면
        ? innerCurry.apply(this, [...args, arg]) // 기존 InnderCurry 가 가지고 있던 args 와 추가된 arg 를 넣어서 전달 (innerCurry(...args))
        : innerCurry.apply(this, args); // 아니라면 기존 args 전달
  };
}

// 밑 부분은 return innerCurry.bind(this, ...args) 로 변경할 수 있다.
