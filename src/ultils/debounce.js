// utils/debounce.js
export function debounce(fn, delay = 300, immediate = false) {
  let timer = null;
  let isInvoked = false; // 标记是否已经立即执行过

  return function (...args) {
    const context = this;

    // 如果有定时器，清除它（重新计时）
    if (timer) clearTimeout(timer);

    // 是否立即执行
    if (immediate && !isInvoked) {
      fn.apply(context, args);
      isInvoked = true;
    }

    // 设置新的定时器
    timer = setTimeout(() => {
      // 非立即执行模式下，在这里执行
      if (!immediate) {
        fn.apply(context, args);
      }
      // 重置标记，以便下次触发时可以再次立即执行
      isInvoked = false;
      timer = null;
    }, delay);
  };
}
