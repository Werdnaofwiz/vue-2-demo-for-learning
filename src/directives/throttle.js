// directives/throttle.js

export default {
  bind(el, binding) {
    const { value, arg } = binding;
    const interval = Number(arg) || 300; // 从参数获取间隔时间，如 v-throttle:500

    let lastTime = 0;
    let timer = null;

    const handler = function (event) {
      const context = this;
      const args = [event];
      const now = Date.now();

      if (typeof value === "function") {
        if (now - lastTime >= interval) {
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }
          lastTime = now;
          value.apply(context, args);
        } else if (!timer) {
          const remaining = interval - (now - lastTime);
          timer = setTimeout(() => {
            lastTime = Date.now();
            timer = null;
            value.apply(context, args);
          }, remaining);
        }
      } else {
        console.warn("v-throttle 指令需要传入一个函数");
      }
    };

    el._throttleHandler = handler;
    el._throttleTimer = timer;

    // 根据事件类型绑定，这里默认绑定 scroll，也可以支持配置
    el.addEventListener("scroll", handler);
  },

  unbind(el) {
    const handler = el._throttleHandler;
    const timer = el._throttleTimer;
    if (handler) {
      el.removeEventListener("scroll", handler);
    }
    if (timer) {
      clearTimeout(timer);
    }
    delete el._throttleHandler;
    delete el._throttleTimer;
  },
};
