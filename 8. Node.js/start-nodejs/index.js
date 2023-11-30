// 실행할 때는 node index.js
console.log("Hello nodejs");

const getCount = (function () {
  let count = 1;
  return function () {
    ++count;
    return count;
  };
})();

console.log(getCount()); // 2
console.log(getCount()); // 3
// 클로저
// 함수가 속한 렉시컬 스코프를 기억하여 함수가 렉시컬 스코프 밖에서 실행될 때도 그 스코프에 접근할 수 있게 하는 기능

const promiseFunc1 = function () {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("첫번째 Promise 끝");
    }, 1000);
  });
};

const promiseFunc2 = function () {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("두번째 Promise 끝");
    }, 1000);
  });
};

const handleAsyncFunc = async function () {
  const promiseMessage1 = await promiseFunc1();
  console.log("ddd");
  const promiseMessage2 = await promiseFunc2();
  console.log(promiseMessage1, promiseMessage2);
};

handleAsyncFunc(); // 첫번째 Promise 끝 두번째 Promise 끝

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 1000);
});
// 이렇게 실행은 됬다.
console.log(promise);

// 다른 코드들 작성

// 이제 위에서 실행된 결과값을 가져오고 싶다.
promise.then(() => {
  console.log("a");
});
// 이렇게 then 으로 가져오면 됩니다.
