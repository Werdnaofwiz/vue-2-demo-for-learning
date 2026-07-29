<template>
  <div>
    <slot />
    <div class="btn-container">
      <button @click="handleSubmit">提交</button>
      <button @click="handleReset">重置</button>
      <span v-if="!valid" style="color: red; margin-left: 12px">表单有误</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormComponent",
  provide() {
    return { formContext: this._formContext };
  },
  beforeCreate() {
    const validators = [];

    this._formContext = {
      register(fn) {
        validators.push(fn);
      },
      validate() {
        return validators.every((fn) => fn());
      },
      reset() {
        validators.length = 0;
      },
    };
  },
  data() {
    return { valid: true };
  },
  methods: {
    handleSubmit() {
      this.valid = this._formContext.validate();
      if (this.valid) this.$emit("submit");
    },
    handleReset() {
      this._formContext.reset();
      this.valid = true;
      this.$emit("reset");
    },
  },
};
</script>

<style scoped>
.btn-container {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}
</style>
