/**
 * @template T
 * @param {T} value
 * @return {T}
 */
export default function deepClone(value) {
  if (!(value instanceof Object)) return value;

  const objKeys = Object.keys(value);
  const deepCloneObject = {};

  objKeys.forEach((key) => {
    if (!(value[key] instanceof Object)) {
      deepCloneObject[key] = value[key];
      return;
    } else {
      deepCloneObject[key] = deepClone(value[key]);
      return;
    }
  });

  return deepCloneObject;
}

// 다른 방법들
const myOriginal = { a: 1, b: { c: 2, d: { f: 3 } } };

// 지원하는 브라우저는 크롬(98)과 사파리(15.4) 파이어폭스(94), 엣지(98) 이다.
// 기존 JSON.parse(JSON.strigify(myOriginal)) 과 달리 프로토타입, set, map, symbol 등 기존에 카피하지 못했던 부분까지 가능하다.
const myDeepCopy = structuredClone(myOriginal);

// 다만 제한조건이 있다.
// 1. 클래스 인스턴스와 함께 StructuredClone()을 사용하면 구조적 복제가 객체의 프로토타입 체인을 삭제하므로 일반 객체를 반환 값으로 얻게 된다.
// 2. 객체에 Function이 포함되어 있으면 해당 Function은 조용히 삭제된다.
// 3. 일부 값은 구조적으로 복제할 수 없으며 특히 Error 및 DOM 노드가 그렇다.

// 다른풀이

/**
 * @template T
 * @param {T} value
 * @return {T}
 */
export default function deepClone(value) {
  if (typeof value !== 'object' || value === null) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => deepClone(item));
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, value]) => [key, deepClone(value)]),
  );
}
