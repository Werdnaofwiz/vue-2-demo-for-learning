<template>
  <div>
    <h2>
      3. 在mixins的beforeCreate钩子写代码逻辑，模拟vue/composition-api插件
    </h2>
    <div class="vue3-style-setup">
      <p>
        count: <strong>{{ count.value }}</strong>
      </p>
      <button @click="increment">点我 +1</button>

      <hr />

      <pre>{{ text.value }}</pre>
    </div>
  </div>
</template>

<script>
import { setupMixin } from "@/mixins/setupMixin";

export default {
  name: "Vue3StyleSetup",
  mixins: [setupMixin],

  // 纯 Vue 3 风格
  setup() {
    // 这里别直接写const count = 0，最后返回count。如果这么写vue底层赋值给rawData对象时，
    // 赋的值就是基本数据类型0，而不是引用数据类型的内存地址，就会开辟一块新内存，使得新数据
    // 和该组件就断链了，联系被切断。
    const count = {
      value: 0,
    };

    function increment() {
      count.value++;
    }

    const text = {
      value: `
有时需要将 Vue 3 项目降级迁移到 Vue 2。如果原项目使用了 Composition API 和 <script setup>，
可以借助 @vue/composition-api 这个插件，把 Vue 3 的 setup 代码直接放进 Vue 2 项目里跑起来。

这个插件的核心原理，就是在 mixin 里利用 beforeCreate 钩子做“偷梁换柱”。
必须在 beforeCreate 里完成转化逻辑，因为这是 Vue 初始化流程中最早的一步——
此时 data 还是原始函数，还没有被装上 getter/setter。

如果等到 created 阶段，data 已经被处理成响应式数据并挂载到 this 上了，
再想修改 $options.data 就来不及了。因为 Vue 在 created 之前已经读完了 data，
不会再回头重新读取。

本代码的编写属于元编程的范畴，你的代码不直接干业务，而是去修改程序本身的行为。
      `,
    };

    return {
      count,
      increment,
      text,
    };
  },
};
</script>

<style scoped>
.vue3-style-setup {
  padding: 20px;
  background-color: #ddd;
  margin-bottom: 20px;
}

.vue3-style-setup p {
  margin-top: 0;
}

hr {
  margin: 20px 0;
}
</style>
