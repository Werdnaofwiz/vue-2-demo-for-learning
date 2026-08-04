<template>
  <div class="container">
    <h3>props和emit</h3>
    <ul>
      <!-- 子组件1 每一个 li -->
      <CustomizedLi v-for="(item, i) in list" :key="i" :title="item.title" />
    </ul>
    <hr />
    <!-- 子组件2 定制input -->
    <CustomizedInput @inputChange="addTodo" />
  </div>
</template>

<script>
import CustomizedLi from "./CustomizedLi.vue";
import CustomizedInput from "./CustomizedInput.vue";

export default {
  components: {
    CustomizedLi,
    CustomizedInput,
  },

  data() {
    return {
      list: [{ title: "吃饭" }, { title: "睡觉" }, { title: "打艳儿宝" }],
    };
  },

  methods: {
    addTodo(item) {
      this.list.push(item);
    },
  },
};
</script>

<style scoped>
.container {
  background-color: #ddd;
}
</style>
