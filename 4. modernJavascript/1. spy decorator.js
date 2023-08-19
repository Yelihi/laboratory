/**
 * Create a decorator spy(func) that should return a wrapper that saves all calls to function in its calls property.

    Every call is saved as an array of arguments.
 * 
 * 
 */

function spy(func) {
  function wrapper(...arguments) {
    // 인자가 스프레드 되어서 들어온다.
    console.log(arguments);
    wrapper.calls.push(arguments);
    return func.apply(this, arguments);
  }

  wrapper.calls = [];

  return wrapper;
}

function work(a, b) {
  return a + b; // work is an arbitrary function or method
}

work = spy(work);

work(1, 2); // 3
work(4, 5); // 9

for (let args of work.calls) {
  console.log("call:" + args.join()); // "call:1,2", "call:4,5"
}
