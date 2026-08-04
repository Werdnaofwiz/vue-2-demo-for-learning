<template>
  <div class="container">
    <input
      type="text"
      placeholder="请输入要干什么"
      v-model="inputValue"
      @keydown.enter="handleInputChange"
    />
    <button @click="handleInputChange">追加一个事项</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    handleInputChange() {
      if (!this.inputValue) {
        alert("内容不能为空");
        return;
      }
      const item = { title: this.inputValue };
      this.$emit("inputChange", item);
    },
  },
};
</script>

<style scoped>
.container {
  padding: 10px;
  display: flex;
  gap: 10px;
}
</style>
