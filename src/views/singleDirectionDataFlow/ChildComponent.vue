<template>
  <div>
    <input type="checkbox" :checked="todo.done" @change="handleChange" />

    {{ todo.content }}
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },

  methods: {
    handleChange() {
      // 不修改todo.done

      // 只告诉父组件：
      // 用户想切换这个todo

      this.$emit("toggle", this.todo.id);
    },
  },
};
</script>
