import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import counter from "./modules/counter";

Vue.use(Vuex);

export default new Vuex.Store({
  // 根级别的 state（全局数据）
  state: {
    appName: "Vuex 演示项目",
    version: "1.0.0",
  },

  // 根级别的 getters
  getters: {
    appInfo: (state) => `${state.appName} v${state.version}`,
  },

  // 根级别的 mutations
  mutations: {
    UPDATE_APP_NAME(state, newName) {
      state.appName = newName;
    },
  },

  // 根级别的 actions
  actions: {
    updateAppName({ commit }, newName) {
      commit("UPDATE_APP_NAME", newName);
    },
  },

  // ====== 重点：模块注册 ======
  modules: {
    user, // 用户模块，访问路径：store.state.user
    counter, // 计数器模块，访问路径：store.state.counter
  },
});
