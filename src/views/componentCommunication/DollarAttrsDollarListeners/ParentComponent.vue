<template>
  <div class="container">
    <h3>$attrs和$listeners</h3>
    <CustomizedInput
      placeholder="请输入文本"
      @focus="handleFocus"
      haha="哈哈"
    />
    <p :class="valueColorClass">{{ value }}</p>
  </div>
</template>

<script>
import CustomizedInput from "./CustomizedInput.vue";
export default {
  components: {
    CustomizedInput,
  },
  data() {
    return {
      value: "没聚焦",
      valueColorClass: "",
    };
  },
  methods: {
    handleFocus() {
      this.value = "聚焦过了";
      this.valueColorClass = "red";
    },
  },
};
</script>

<style scoped>
.container {
  background-color: #ddd;
}

.red {
  color: red;
}

::v-deep .input-class {
  border: 2px solid red;
}
</style>
