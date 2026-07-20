<template>
  <div class="container">
    <h1>Vue2 自定义指令案例——滚动动画</h1>

    <p class="tip">向下滚动，卡片进入可视区域后会播放动画。</p>

    <div style="height: 300px"></div>

    <div class="card" v-for="item in list" :key="item" v-scroll>
      第 {{ item }} 个卡片
    </div>

    <div style="height: 500px"></div>
  </div>
</template>

<script>
export default {
  name: "DirectiveScroll",

  data() {
    return {
      // 创造一个长度为 20 的数组，数组元素为 1~20
      list: Array.from({ length: 20 }, (_, i) => i + 1),
    };
  },

  directives: {
    scroll: {
      inserted(el) {
        // 初始状态
        el.style.opacity = 0;
        el.style.transform = "translateY(40px)";
        el.style.transition = "all .6s ease";

        const handler = () => {
          // 获取元素距离顶部的距离
          const top = el.getBoundingClientRect().top;

          if (top < window.innerHeight - 100) {
            el.style.opacity = 1;
            el.style.transform = "translateY(0)";

            window.removeEventListener("scroll", handler);
          }
        };

        window.addEventListener("scroll", handler);

        handler();

        el._handler = handler;
      },

      unbind(el) {
        window.removeEventListener("scroll", el._handler);
      },
    },
  },
};
</script>

<style scoped>
.container {
  width: 900px;
  margin: auto;
  padding: 30px;
}

.tip {
  color: #666;
  margin-bottom: 40px;
}

.card {
  height: 120px;

  margin-bottom: 30px;

  background: #42b983;

  color: white;

  font-size: 28px;

  display: flex;

  justify-content: center;

  align-items: center;

  border-radius: 8px;

  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
</style>
