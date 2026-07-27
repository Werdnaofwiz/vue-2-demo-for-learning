// utils/customToast.js
import Vue from "vue";

let instance = null; // ✅ 单例实例

const ToastComponent = Vue.extend({
  template: `
    <transition name="fade">
      <div v-if="visible" class="custom-toast-container" :class="typeClass">
        <span class="custom-toast-icon">{{ icon }}</span>
        <span class="custom-toast-message">{{ message }}</span>
      </div>
    </transition>
  `,
  data() {
    return {
      message: "",
      type: "info",
      duration: 3000,
      visible: false,
      timer: null,
    };
  },
  computed: {
    typeClass() {
      return `custom-toast-${this.type}`;
    },
    icon() {
      const icons = {
        info: "ℹ️",
        success: "✅",
        warning: "⚠️",
        error: "❌",
      };
      return icons[this.type] || "ℹ️";
    },
  },
  methods: {
    show(options) {
      // 清除之前的定时器
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }

      // 更新数据
      this.message = options.message || "";
      this.type = options.type || "info";
      this.duration = options.duration || 3000;
      this.visible = true;

      // 自动关闭
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          this.close();
        }, this.duration);
      }
    },
    close() {
      this.visible = false;
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      // 不销毁实例，只是隐藏
    },
  },
});

// ✅ 单例模式：只创建一次实例
function getInstance() {
  if (!instance) {
    instance = new ToastComponent();
    instance.$mount();
    document.body.appendChild(instance.$el);
  }
  return instance;
}

function createCustomToast(options) {
  if (typeof options === "string") {
    options = { message: options };
  }

  const toastInstance = getInstance();
  toastInstance.show({
    message: options.message || "",
    type: options.type || "info",
    duration: options.duration || 3000,
  });

  return toastInstance;
}

const customToast = {
  show: (message, duration) => createCustomToast({ message, duration }),
  info: (message, duration) =>
    createCustomToast({ message, type: "info", duration }),
  success: (message, duration) =>
    createCustomToast({ message, type: "success", duration }),
  warning: (message, duration) =>
    createCustomToast({ message, type: "warning", duration }),
  error: (message, duration) =>
    createCustomToast({ message, type: "error", duration }),
  close: () => {
    if (instance) {
      instance.close();
    }
  },
};

export function installCustomToast(Vue) {
  Vue.prototype.$customToast = customToast;
}

export default customToast;
