// utils/throttle.js
export function throttle(fn, interval = 300) {
  let lastTime = 0;
  let timer = null;

  return function (...args) {
    const context = this;
    const now = Date.now();

    // 如果距离上次执行的时间差大于间隔，立即执行
    if (now - lastTime >= interval) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      lastTime = now;
      fn.apply(context, args);
    } else if (!timer) {
      // 如果还没到时间，设置一个定时器，保证最后一次也能执行
      const remaining = interval - (now - lastTime);
      timer = setTimeout(() => {
        lastTime = Date.now();
        timer = null;
        fn.apply(context, args);
      }, remaining);
    }
  };
}
