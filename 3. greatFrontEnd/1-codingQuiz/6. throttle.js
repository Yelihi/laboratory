/**
 * @callback func
 * @param {number} wait
 * @return {Function}
 */
export default function throttle(func, wait) {
  let shouldThrottle = false;

  return function (...args) {
    if (shouldThrottle) return;
    if (!shouldThrottle) {
      shouldThrottle = true;
      func.apply(this, args);
    }

    return setTimeout(() => {
      shouldThrottle = false;
    }, wait);
  };
}
