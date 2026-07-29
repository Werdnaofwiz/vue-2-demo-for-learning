<template>
  <div>
    <h2>2. AOP（面向切面编程）—— 为所有方法添加“埋点”</h2>
    <div class="aop-demo">
      <p>请打开控制台</p>

      <hr />

      <pre>{{ text }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: `
AOP 之所以必须在 beforeCreate 钩子中改写 methods，是因为此时 Vue 
尚未将 $options.methods 中的原始函数挂载到实例上——我们修改的是“图纸”
而非“实物”。当我们在 beforeCreate 中完成函数替换后，Vue 随后才会读取
这些被修改过的配置并挂载到 this 上，因此最终用户调用的方法就是增强后
的版本。若将逻辑放到 created 中，此时 Vue 已完成方法的挂载，再去修改 
$options.methods 只能改变图纸，却无法影响已盖好的房子，切面逻辑无法生效。

虽然技术上也可以在 created 里直接覆盖 this 上的方法并使其生效，但这属于
“修房子”（仅影响当前实例），而框架级 AOP 需要的是“改图纸”（影响所有基于
该蓝图构建的实例）。因此，beforeCreate 是 Vue 2 中实现全局切面增强的
唯一正确窗口——改图纸，而非修房子。
      `,
    };
  },
  methods: {
    foo() {
      return 1;
    },
  },
  beforeCreate() {
    const methods = this.$options.methods;
    if (methods) {
      Object.keys(methods).forEach((key) => {
        const original = methods[key];
        // 狸猫换太子：替换原始图纸中的函数
        methods[key] = function (...args) {
          console.log(`[Track] 执行了方法: ${key}`);
          return original.apply(this, args);
        };
      });
    }
  },
  mounted() {
    console.warn("2. AOP —— 为所有方法添加“埋点” ");
    this.foo();
  },
};
</script>

<style scoped>
.aop-demo {
  padding: 20px;
  background-color: #ddd;
}

p {
  margin-top: 0;
}
</style>
