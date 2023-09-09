/**
 * @param {Function} func
 * @param {number} wait
 * @return {Function}
 */
export default function debounce(func, wait) {
  let timeout = null;

  return function (...args) {
    // Keep a reference to `this`
    clearTimeout(timeout);
    timeout = setTimeout(() => { // 화살표 함수를 하게 되면 this 의 결정이 함수의 호출이 아닌 생성때의 컨텍스트에 따라 결정이 된다.
      timeout = null; // 반드시 필요한건 아니지만 해주면 좋다.
      func.call(this, ...args);
    }, wait);
  };
}

// 사실 이러한 의미에서 return function 은 화살표 함수로 하지 않는다. 왜냐하면 반환 함수의 This 는 누가 어디서 호출하느냐에 따라서 동적으로 결정되어야 하기 때문이다.

// 이렇게 해도 된다.

export default function debounce(func, wait) {
  let timeout;

  return function (...args){
    const context = this; // 사전이 미리 this 를 기억해놓는다.
    clearTimeout(timeout);
    timeout = setTimeout(function() { // 시간이 지나 함수를 실행할 때 기억된 this 를 넣어준다.
      func.call(context, ...args)
    }, wait)
  }


}
