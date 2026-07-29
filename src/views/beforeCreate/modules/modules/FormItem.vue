<template>
  <div>
    <label>{{ label }}</label>
    <input :value="value" @input="$emit('input', $event.target.value)" />
    <span v-if="!valid" style="color: red; font-size: 12px">{{ error }}</span>
  </div>
</template>

<script>
export default {
  name: "FormItem",
  inject: ["formContext"],
  props: {
    label: String,
    value: String,
    required: Boolean,
  },
  data() {
    return {
      valid: true,
      error: "",
    };
  },
  mounted() {
    this.formContext.register(this.validate);
  },
  methods: {
    validate() {
      if (this.required && !this.value) {
        this.valid = false;
        this.error = "此项必填";
        return false;
      }
      this.valid = true;
      this.error = "";
      return true;
    },
  },
};
</script>
