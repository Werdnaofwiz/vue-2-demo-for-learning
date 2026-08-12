<template>
  <div>
    <h2>Vuex 模块化演示</h2>

    <!-- ====== 1. 使用根级别 ====== -->
    <h3>根级别数据</h3>
    <p>App名称: {{ $store.state.appName }}</p>
    <p>App信息(getter): {{ $store.getters.appInfo }}</p>
    <button @click="$store.dispatch('updateAppName', '新项目名')">
      修改根state
    </button>

    <hr />

    <!-- ====== 2. 使用 user 模块 ====== -->
    <h3>用户模块 (user)</h3>
    <p>姓名: {{ $store.state.user.name }}</p>
    <p>年龄: {{ $store.state.user.age }}</p>
    <p>邮箱: {{ $store.state.user.email }}</p>
    <p>登录状态: {{ $store.getters["user/loginStatus"] }}</p>
    <p>用户信息(getter): {{ $store.getters["user/userInfo"] }}</p>

    <button @click="$store.commit('user/SET_USER_NAME', '李四')">
      改名为李四 (commit)
    </button>
    <button @click="$store.dispatch('user/updateAge', 30)">
      改为30岁 (dispatch)
    </button>
    <button @click="handleLogin">登录 (dispatch)</button>
    <button @click="$store.dispatch('user/logout')">登出 (dispatch)</button>

    <hr />

    <!-- ====== 3. 使用 counter 模块 ====== -->
    <h3>计数器模块 (counter)</h3>
    <p>当前值: {{ $store.state.counter.count }}</p>
    <p>双倍: {{ $store.getters["counter/doubleCount"] }}</p>
    <p>操作次数: {{ $store.getters["counter/totalOperations"] }}</p>

    <button @click="$store.commit('counter/INCREMENT')">+1</button>
    <button @click="$store.commit('counter/DECREMENT')">-1</button>
    <button @click="$store.commit('counter/ADD_NUMBER', 5)">+5</button>
    <button @click="$store.dispatch('counter/incrementAsync')">异步+1</button>
    <button @click="$store.dispatch('counter/batchUpdate')">
      批量操作(+5再-1)
    </button>
    <button @click="$store.commit('counter/RESET_COUNT')">重置</button>

    <hr />

    <!-- ====== 4. 使用辅助函数（推荐方式） ====== -->
    <h3>使用辅助函数（更简洁）</h3>
    <div>
      <p><strong>从 user 模块：</strong></p>
      <p>姓名: {{ userName }}</p>
      <p>年龄: {{ userAge }}</p>
      <p>登录状态: {{ loginStatus }}</p>
      <button @click="setUserName('王五')">改名</button>
      <button @click="updateAge(35)">改年龄</button>
    </div>

    <div>
      <p><strong>从 counter 模块：</strong></p>
      <p>count: {{ count }}</p>
      <p>double: {{ doubleCount }}</p>
      <button @click="increment">+1</button>
      <button @click="incrementAsync">异步+1</button>
    </div>

    <!-- ====== 5. 查看历史记录 ====== -->
    <h3>操作历史</h3>
    <ul>
      <li v-for="(item, index) in recentHistory" :key="index">
        {{ item }}
      </li>
    </ul>
    <button @click="$store.commit('counter/CLEAR_HISTORY')">清空历史</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  computed: {
    // ====== 从根级别映射 ======
    ...mapState(["appName"]),
    ...mapGetters(["appInfo"]),

    // ====== 从 user 模块映射 ======
    ...mapState("user", {
      userName: (state) => state.name,
      userAge: (state) => state.age,
      userEmail: (state) => state.email,
    }),
    ...mapGetters("user", ["loginStatus", "userInfo", "isAdult"]),

    // ====== 从 counter 模块映射 ======
    ...mapState("counter", ["count", "history"]),
    ...mapGetters("counter", [
      "doubleCount",
      "tripleCount",
      "recentHistory",
      "totalOperations",
    ]),
  },

  methods: {
    // ====== 从 user 模块映射方法 ======
    ...mapMutations("user", [
      "SET_USER_NAME",
      "SET_USER_AGE",
      "SET_LOGIN_STATUS",
    ]),
    ...mapActions("user", ["login", "logout", "updateAge"]),

    // ====== 从 counter 模块映射方法 ======
    ...mapMutations("counter", [
      "INCREMENT",
      "DECREMENT",
      "ADD_NUMBER",
      "RESET_COUNT",
    ]),
    ...mapActions("counter", [
      "incrementAsync",
      "decrementAsync",
      "batchUpdate",
    ]),

    // ====== 自定义业务方法 ======
    handleLogin() {
      this.login({
        name: "赵六",
        age: 28,
        email: "zhaoliu@example.com",
      }).then((res) => {
        alert(res);
      });
    },

    setUserName(name) {
      this.SET_USER_NAME(name);
    },

    increment() {
      this.INCREMENT();
    },
  },
};
</script>

<style scoped>
/* 极简样式 */
div {
  padding: 20px;
}
h3 {
  margin: 20px 0 10px;
  color: #2c3e50;
}
button {
  margin: 4px 6px 4px 0;
  padding: 6px 14px;
  cursor: pointer;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
}
button:hover {
  background: #35495e;
}
p {
  margin: 4px 0;
}
ul {
  margin: 8px 0;
  padding-left: 20px;
}
hr {
  margin: 20px 0;
  border: 1px solid #ddd;
}
</style>
