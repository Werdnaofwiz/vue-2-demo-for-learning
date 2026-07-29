let instanceCounter = 0;

export const debugMixin = {
  beforeCreate() {
    // 读组件名（如果没有 name，就标为 Anonymous）
    const componentName = this.$options.name || "Anonymous";

    instanceCounter++;

    // 生成带组件名的唯一 ID
    this._uid = `${componentName}_${instanceCounter}`;

    // 开发环境下打印日志
    if (process.env.NODE_ENV === "development") {
      // 我底下这个Promise纯粹是为了让代码打印在控制台的最后，别和前面的打印搅和
      // 实际项目无任何意义。
      Promise.resolve().then(() => {
        console.log(`[Debug] 实例创建: ${this._uid}`, this);
      });
    }
  },
};
