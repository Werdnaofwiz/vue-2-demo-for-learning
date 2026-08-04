<template>
  <li>{{ title }}</li>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      require: true,
      default: "未填写",
    },
  },
};
</script>
