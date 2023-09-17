### 스레드

스레드란 실행 흐름의 최소단위이다. 예를 들면 카카오톡을 실행시킬 때, 메시지를 받는 역할을 하는 스레드가 있고, 메시지를 보내는 역할을 하는 녀석과 매 화면을 업데이트 하는 스레드가 있다. 이런식으로 하나의 프로세스에는 여러 스레드가 각자의 역할에 따라 수행한다. <br />

다른 예시라면 어떠한 수 배열에 대한 누적합을 구하는 과정에서도 하나의 배열을 누적합하는 하나의 스레드만 이용하는 방법과, 배열을 쪼갠 다음 promise 를 통해 2,3개의 스레드로 나누어서 작업하는 방식이 있다. 속도는 스레드를 나눠서 하는 쪽이 더 빠르다. <br />

```js
function main() {
  const arr = Array(1).fill(Number.MAX_SAFE_INTEGER);
  console.time("main"); // 시간 시작지점

  const result = arr.reduce((acc, num) => acc + num, 0);
  console.log(result);

  console.timeEnd("main"); // 0.2203...ms
}

function sum(numberArray) {
  return new Promise((resolve) => {
    resolve(numberArray.reduce((acc, num) => acc + num, 0));
  });
}

async function asyncMain() {
  const arr = Array(1).fill(Number.MAX_SAFE_INTEGER);

  let mid = Math.ceil(arr.length / 2);
  let firstHalf = arr.slice(0, mid);
  let secondHalf = arr.slice(mid);

  console.time("asyncMain"); // 시간 시작지점

  const [first, second] = await Promise.all([sum(firstHalf), sum(secondHalf)]);
  console.log(first + second);

  console.timeEnd("asyncMain"); // 0ms
}

main();
asyncMain();
```

<br />

다만 리엑트는 하나의 스레드만 활용하는데, 브라우저에서 스레드를 하나밖에 사용하지 않기 때문이다. 기본적으로 리엑트의 렌더링 과정은 크게 4번의 과정을 거치게 된다. <br />

- state 값이 변경된다
- 이후 virtual DOM 간의 diff 를 통해 변경사항을 파악한다
- reconcile 과정을 통해 jsx 를 html 로 변경한다 (즉, 실제 DOM에 적용한다)
- 컴포넌트가 렌더링 된 이후 effect 가 실행이 된다. (effect 에 따라 위 과정 반복)

<br />

<img src="../images/virtualDOM.png" alt="virtualDOM" width="100%" />

<br />
