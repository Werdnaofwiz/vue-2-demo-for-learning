<!-- src/components/TopicCard.vue -->
<template>
  <div class="topic-card" @click="handleClick">
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: "TopicCard",
  props: {
    // 标题
    title: {
      type: String,
      required: true,
    },
    // 描述
    description: {
      type: String,
      required: true,
    },
    // 跳转路径（如果禁用则不需要）
    path: {
      type: String,
      default: "",
    },
  },
  methods: {
    handleClick() {
      if (this.path) {
        this.$router.push(this.path);
      }
    },
  },
};
</script>

<style scoped>
.topic-card {
  background: white;
  border-radius: 12px;
  padding: 10px 20px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.topic-card h3 {
  margin: 10px 0 8px;
  color: #2c3e50;
}

.topic-card p {
  color: #7f8c8d;
  font-size: 14px;
  margin: 0 0 12px;
}

.topic-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  border-color: #42b983;
}
</style>
