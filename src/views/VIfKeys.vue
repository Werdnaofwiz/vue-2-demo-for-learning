<template>
  <div class="container">
    <!-- ========== 第一部分：v-if + key ========== -->

    <section>
      <h4>无 key：DOM 复用</h4>

      <div v-if="show">
        <input placeholder="登录" />
      </div>
      <div v-else>
        <input placeholder="注册" />
      </div>

      <p class="hint">输入内容后切换，观察输入框</p>
    </section>

    <section>
      <h4>有 key：不复用 DOM</h4>

      <div v-if="show">
        <input key="login" placeholder="登录" />
      </div>
      <div v-else>
        <input key="register" placeholder="注册" />
      </div>

      <p class="hint">切换后会创建新的 input</p>
    </section>

    <!-- 实际开发中的情况 -->
    <section>
      <h4>v-model：数据驱动</h4>

      <div v-if="show">
        <input v-model="loginName" placeholder="登录" />
      </div>
      <div v-else>
        <input v-model="registerName" placeholder="注册" />
      </div>

      <p class="hint">实际表单通常使用 v-model</p>
    </section>

    <button @click="show = !show">
      切换 v-if（当前：{{ show ? "登录" : "注册" }}）
    </button>

    <hr />

    <!-- ========== 第二部分：transition + key ========== -->

    <section>
      <h4>无 key：动画不触发</h4>

      <button @click="anim1 = !anim1">切换</button>

      <transition name="fade">
        <div v-if="anim1" class="box">A</div>
        <div v-else class="box">B</div>
      </transition>

      <p class="hint warn">⚠️ 没有动画，直接切换</p>
    </section>

    <section>
      <h4>有 key：动画正常触发</h4>

      <button @click="anim2 = !anim2">切换</button>

      <transition name="fade">
        <div v-if="anim2" key="a" class="box">A</div>
        <div v-else key="b" class="box">B</div>
      </transition>

      <p class="hint success">✅ 有淡入淡出 + 缩放动画</p>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      loginName: "",
      registerName: "",
      anim1: true,
      anim2: true,
    };
  },
};
</script>

<style scoped>
.container {
  padding-left: 20px;
}

section {
  margin: 12px 0;
}

h4 {
  margin-bottom: 8px;
}

input {
  padding: 6px;
}

button {
  padding: 6px 12px;
}

.hint {
  color: #999;
  font-size: 13px;
}
.hint.warn {
  color: #e74c3c;
}
.hint.success {
  color: #2ecc71;
}

hr {
  margin: 20px 0;
}

.box {
  display: inline-block;
  padding: 20px 40px;
  margin-top: 8px;
  background: #409eff;
  color: white;
  border-radius: 8px;
}

/* 淡入 + 淡出 + 轻微缩放 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
