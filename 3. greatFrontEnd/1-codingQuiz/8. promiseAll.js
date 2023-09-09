// 우선 함수는 promise 를 반환해야 한다
// 만약 빈 배열이 들어온다면, 반환도 빈 배열
// 반환된 promise 에는 입력과 동일한 순서로 해결된 값의 배열
// 입력값 중 하나라도 거부되거나 오류가 발생한다면 반환된 Promise는 즉시 거부된다.
// 입력 배열은 promise 가 아닐 수도 있다.

/**
 * @param {Array} iterable
 * @return {Promise<Array>}
 */

export default function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const results = new Array(iterable.length);
    let unresolved = iterable.length;

    // 입력 배열이 없다면
    if (unresolved === 0) {
      resolve(results); // promise 이기에 resolve 해준다.
      return;
    }

    // iterable 순회돌면서 작업하기
    iterable.forEach(async (item, index) => {
      try {
        const value = await item;
        results[index] = value;
        unresolved -= 1;

        if (unresolved === 0) {
          resolve(results);
        }
      } catch (err) {
        reject(err); // 하나라도 오류나면 다 Reject
      }
    });
  });
}


// promise then 으로 변경하기

export default function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const results = new Array(iterable.length);
    let unresolved = iterable.length;

    if (unresolved === 0) {
      resolve(results);
      return;
    }

    iterable.forEach((item, index) => {
      Promise.resolve(item).then(
        (value) => {
          results[index] = value;
          unresolved -= 1;

          if (unresolved === 0) {
            resolve(results);
          }
        },
        (reason) => {
          reject(reason);
        },
      );
    });
  });
}
