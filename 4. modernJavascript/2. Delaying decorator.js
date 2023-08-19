/**
 *
 * Create a decorator delay(f, ms) that delays each call of f by ms milliseconds.
 * 특징은 setTimeout 에 있다. setTimeout 내 첫번째 인자는 콜백함수다. 즉 함수실행문이 아니라 함수가 들어가야 한다.
 * 두 번째는 this 다. 기본 function 의 this는 호출과 관계없이 전역 this를 호출한다. 그래서 setTimeout 내 함수를 선언하고 그 내부에서 this를 사용할 시 this 가 바인딩 되지 않는다.(f1000, f1500)
 * 이에 대한 해결책으로 화살표함수를 사용함으로서 화살표함수 바로 상위 스코프(컨텍스트) 내 this 를 참조한다.
 */

function delay(f, ms) {
  return function () {
    return setTimeout(() => f.apply(this, arguments), ms);
  };
}

function f(x) {
  console.log(x);
}

// create wrappers
let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);

f1000("test"); // shows "test" after 1000ms
f1500("test"); // shows "test" after 1500ms
