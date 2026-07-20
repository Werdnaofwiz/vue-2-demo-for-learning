<template>
  <div class="container">
    <h4>正确利用mouseover冒泡特性做事件委托</h4>
    <ul class="list" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
      <li v-for="item in items" :key="item.id" :data-id="item.id">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { id: 1, name: "项目A" },
        { id: 2, name: "项目B" },
        { id: 3, name: "项目C" },
      ],
    };
  },
  methods: {
    handleMouseOver(e) {
      const li = e.target.closest("li");
      if (li) {
        li.style.background = "#f0f0f0";
        console.log("悬停：", li.dataset.id);
      }
    },
    handleMouseOut(e) {
      const li = e.target.closest("li");
      if (li) {
        li.style.background = "transparent";
      }
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #ddd;
  margin-top: 20px;
}
</style>
