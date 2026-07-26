<!-- src/views/Home.vue -->
<template>
  <div class="home">
    <h1>🎯 Vue 2 课题汇总</h1>
    <p class="subtitle">点击按钮进入对应的课题学习</p>

    <div class="topic-grid">
      <!-- 使用 TopicCard 组件 -->
      <TopicCard
        v-for="(topic, k) in topics"
        :key="k"
        :title="topic.title"
        :description="topic.description"
        :path="topic.path"
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
  data() {
    return {
      topics: [
        {
          title: "数组响应式",
          description: "学习 Vue 2 数组的 7 个变异方法",
          path: "/array-demo",
        },
        {
          title: "Mixin",
          description: "学习 Vue 2 中的 Mixin 特性",
          path: "/mixin-demo",
        },
        {
          title: "展示Mixin的冲突",
          description: "展示 Vue 2 中的 Mixin 的冲突特性",
          path: "/mixin-conflict-demo",
        },
        {
          title: "extends",
          description: "学习 Vue 2 中的 extends 特性",
          path: "/extends-demo",
        },
        {
          title: "自定义指令",
          description: "学习 Vue 2 中的自定义指令",
          statusText: "✅ 已完成",
          path: "/custom-directive-demo",
        },
        {
          title: "自定义指令高级案例",
          description: "学习 Vue 2 中的自定义指令高级用法",
          path: "/directive-advanced-demo",
        },
        {
          title: "单向数据流",
          description: "学习 Vue 2 中的单向数据流概念",
          statusText: "✅ 已完成",
          path: "/single-direction-data-flow",
        },
        {
          title: "$set案例展示",
          description: "学习 Vue 2 中的$set用法",
          path: "/dollar-set",
        },
        {
          title: "v-if v-for不要连用",
          description: "性能优化1",
          path: "/v-if-and-v-for",
        },
        {
          title: "v-for事件代理优化",
          description: "性能优化2",
          path: "/v-for-event-delegation",
        },
        {
          title: "mouserover冒泡机制",
          description: "性能优化2知识补充",
          path: "/mouseover-mouseenter",
        },
        {
          title: "异步组件",
          description: "性能优化3",
          path: "/async-component",
        },
        {
          title: "防抖节流",
          description: "性能优化4",
          path: "/debounce-throttle",
        },
        {
          title: "触底加载",
          description: "性能优化5",
          path: "/loadmore",
        },
        {
          title: "虚拟列表",
          description: "性能优化6",
          path: "/virtual-list",
        },
        {
          title: "虚拟列表+触底下载",
          description: "性能优化7",
          path: "/virtual-list-with-load-more",
        },
        {
          title: "虚拟列表：使用第三方库",
          description: "性能优化8",
          path: "/virtual-list-Using-library",
        },
        {
          title: "渲染分层hack",
          description: "性能优化9",
          path: "/compositing-layer-hack",
        },
      ],
    };
  },
};
</script>

<style scoped>
.home {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
}

h1 {
  text-align: center;
  font-size: 32px;
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
