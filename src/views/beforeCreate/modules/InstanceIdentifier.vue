<template>
  <div>
    <h2>5. 非侵入式地挂载“实例标识”（调试神器）</h2>
    <div class="instance-identifier-container">
      <h3>父组件</h3>
      <p>父组件 _uid: {{ _uid }}</p>
      <hr />
      <ChildC />
      <ChildD />
      <ChildE />
    </div>
  </div>
</template>

<script>
import { debugMixin } from "@/mixins/debugMixin.js";
import ChildC from "./modules/ChildComponentC.vue";
import ChildD from "./modules/ChildComponentD.vue";
import ChildE from "./modules/ChildComponentE.vue";

export default {
  name: "InstanceIdentifier",
  // 🔥 局部 mixin：只有当前组件和子组件有 _uid
  mixins: [debugMixin],
  components: {
    ChildC,
    ChildD,
    ChildE,
  },
  mounted() {
    console.warn("5. 非侵入式地挂载“实例标识”（调试神器）");
  },
};
</script>

<style scoped>
.instance-identifier-container {
  padding: 20px;
  background-color: #ddd;
}
h3 {
  margin-top: 0;
}
</style>
