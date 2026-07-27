<!-- src/views/Home.vue -->
<template>
  <div class="home">
    <h2>🎯 Vue 2 课题汇总</h2>
    <p class="subtitle">点击按钮进入对应的课题学习</p>

    <div class="topic-grid">
      <!-- 使用 TopicCard 组件 -->
      <TopicCard
        v-for="(route, k) in routes"
        :key="k"
        :title="route.meta.title"
        :description="route.meta.description"
        :path="route.path"
      />
    </div>
  </div>
</template>

<script>
import TopicCard from "@/views/homepage/modules/TopicCard.vue";

export default {
  name: "HomePage",
  components: {
    TopicCard,
  },
  computed: {
    routes() {
      return this.$router.options.routes.filter((route) => route.path !== "/");
    },
  },
};
</script>

<style scoped>
.home {
  margin: 0 auto;
  padding: 0 40px;
}

h2 {
  text-align: center;
  color: #2c3e50;
}

.subtitle {
  text-align: center;
  color: #7f8c8d;
  margin-bottom: 40px;
}

.topic-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
}
</style>
