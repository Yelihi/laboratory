/**
 * @param {...(any|Object|Array<any|Object|Array>)} args
 * @return {string}
 */

export default function classNames(...args) {
  const result = [];
  const flat = [...args].flat(Infinity);

  flat.forEach((name) => {
    if (!name) return;

    if (typeof name === "string" || typeof name === "number") {
      result.push(name);
      return;
    }

    if (name instanceof Object) {
      for (let key in name) {
        if (Object.hasOwn(name, key) && name[key]) {
          result.push(key);
        }
      }
      return;
    }
  });

  return result.length == 0 ? "" : result.join(" ");
}
