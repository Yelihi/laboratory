/**
 * @param {*} valueA
 * @param {*} valueB
 * @return {boolean}
 */
export default function deepEqual(valueA, valueB) {
  // primative
  // Object.is 는 원시값에 대한 비교
  if (Object.is(valueA, valueB)) {
    return true;
  }

  // 이제부터 객체
  const bothObjects =
    Object.prototype.toString.call(valueA) === "[object Object]" &&
    Object.prototype.toString.call(valueB) === "[object Object]";
  const bothArrays = Array.isArray(valueA) && Array.isArray(valueB);

  // 둘다 객체이거나 아니면 둘다 배열이거나
  // 즉 둘이 동시에 객체이거나 배열이 아니라면 False
  if (!bothObjects && !bothArrays) {
    return false;
  }

  // Object의 key 수가 같은지 확인
  if (Object.keys(valueA).length !== Object.keys(valueB).length) {
    return false;
  }

  // 순회를 돌면서 체크하기
  for (const key of Object.keys(valueA)) {
    if (!deepEqual(valueA[key], valueB[key])) {
      return false;
    }
  }

  return true;
}
