// 最简版：让 setup 返回的数据变成响应式 data
export const setupMixin = {
  beforeCreate() {
    const setup = this.$options.setup;
    if (typeof setup !== "function") return;

    // 备份原始 data（如果有）
    const originalData = this.$options.data;

    // 替换 data
    this.$options.data = function () {
      // 执行 setup，拿到返回的对象
      const setupResult = setup(this.$props || {}, {
        emit: this.$emit?.bind(this) || (() => {}),
      });

      // 执行原始 data（如果有）
      const originalResult = originalData ? originalData.call(this) : {};

      // 🔥 关键：合并返回，Vue 2 会自动把整个对象变成响应式
      return {
        ...setupResult,
        ...originalResult,
      };
    };
  },
};
