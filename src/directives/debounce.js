// directives/debounce.js
export default {
  // 只调用一次，在指令第一次绑定到元素时调用
  bind(el, binding) {
    const { value, arg, modifiers } = binding;
    const delay = Number(arg) || 300; // 从参数获取延迟时间，如 v-debounce:500
    const immediate = modifiers.immediate || false; // 是否有 .immediate 修饰符

    let timer = null;
    let isInvoked = false;

    // 包装后的执行函数
    const handler = function (event) {
      const context = this;
      let args;
      if (binding.modifiers.passValue) {
        args = [event.target.value]; // 传值
      } else {
        args = [event]; // 传事件对象
      }

      // 如果有值且是函数，执行它
      if (typeof value === "function") {
        if (timer) clearTimeout(timer);

        // immediate 逻辑
        if (immediate && !isInvoked) {
          value.apply(context, args);
          isInvoked = true;
        }

        timer = setTimeout(() => {
          if (!immediate) {
            value.apply(context, args);
          }
          isInvoked = false;
          timer = null;
        }, delay);
      } else {
        console.warn("v-debounce 指令需要传入一个函数");
      }
    };

    // 保存 handler 到元素上，以便解绑时清除定时器
    el._debounceHandler = handler;
    el._debounceTimer = timer;

    // 绑定事件
    el.addEventListener("input", handler);
  },

  // 指令与元素解绑时调用
  unbind(el) {
    const handler = el._debounceHandler;
    const timer = el._debounceTimer;
    if (handler) {
      el.removeEventListener("input", handler);
    }
    if (timer) {
      clearTimeout(timer);
    }
    delete el._debounceHandler;
    delete el._debounceTimer;
  },
};
