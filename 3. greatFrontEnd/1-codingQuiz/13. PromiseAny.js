/**
 * @param {Array} iterable
 * @return {Promise<Array>}
 */

// 몇개의 promise 가 들어오던지 가장 먼저 끝나는 promise 를 resolve 하는 함수로서
// iterable 을 순차적으로 실행시키면서 가장 먼저 끝나는 promise 를 resolve 하는데 이 때 만일 setTimeout 으로 지연되는 경우는
// 어차피 callstack 에서 macroQueue 로 이동시키기 때문에 상관없다.
export default function promiseAny(iterable) {
  return new Promise((resolve, reject) => {
    // 만일 아무런 인자도 없다면
    if (iterable.length == 0) {
      reject(new AggregateError([]));
    }

    // 모든 promise 가 reject 일 때 전체를 reject 하기 위한 조건
    let pending = iterable.length;
    // index 에 각각에 해당하는 reject 를 담기 위함
    const errors = new Array(iterable.length);

    iterable.forEach(async (item, index) => {
      try {
        const value = await item;
        // 바로바로 resolve 하기
        resolve(value);
      } catch (err) {
        // 배열에 에러를 담기
        errors[index] = err;
        pending--;

        if (pending == 0) {
          reject(new AggregateError(errors));
        }
      }
    });
  });
}
