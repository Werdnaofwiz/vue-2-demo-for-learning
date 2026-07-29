<template>
  <div class="container">
    <h1>beforeCreate钩子能干些什么</h1>
    <hr />

    <!-- 1.与模块作用域数据共享相较，beforeCreate挂载在组件实例的数据是各自独立的 -->
    <h2>
      1.与模块作用域数据共享相较，beforeCreate挂载在组件实例的数据是各自独立的
    </h2>
    <ModuleScopeLimitation />
    <IndependentInstance />
    <hr />

    <!-- 2. AOP（面向切面编程）—— 为所有方法添加“埋点” -->
    <AOPDemo />
    <hr />

    <!-- 3. 在mixins的beforeCreate钩子写代码逻辑，模拟vue/composition-api插件 -->
    <Vue3StyleSetup />
    <hr />

    <!-- 4. 在“依赖注入”中充当“中间商” -->
    <ProvideInjectDemo />
    <hr />

    <!-- 5. 非侵入式地挂载“实例标识”（调试神器） -->
    <InstanceIdentifier />
    <hr />

    <AuthControllNote />
  </div>
</template>

<script>
import ModuleScopeLimitation from "./modules/ModuleScopeLimitation.vue";
import IndependentInstance from "./modules/IndependentInstances.vue";
import AOPDemo from "./modules/AOPDemo.vue";
import Vue3StyleSetup from "./modules/Vue3StyleSetup.vue";
import ProvideInjectDemo from "./modules/ProvideInjectDemo.vue";
import InstanceIdentifier from "./modules/InstanceIdentifier.vue";
import AuthControllNote from "./modules/AuthControllNote.vue";

export default {
  components: {
    ModuleScopeLimitation,
    IndependentInstance,
    AOPDemo,
    Vue3StyleSetup,
    ProvideInjectDemo,
    InstanceIdentifier,
    AuthControllNote,
  },
};
</script>

<style scoped>
.container {
  padding: 50px;
}

hr {
  margin: 40px 0;
}

.container ::v-deep pre {
  font-size: 17px;
  margin: 0;
}
</style>
