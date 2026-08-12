// 计数器模块
const counter = {
  namespaced: true,

  state: {
    count: 0,
    history: [], // 记录操作历史
  },

  getters: {
    doubleCount: (state) => state.count * 2,

    tripleCount: (state) => state.count * 3,

    // 最近3条历史记录
    recentHistory: (state) => state.history.slice(-3),

    // 统计操作次数
    totalOperations: (state) => state.history.length,
  },

  mutations: {
    INCREMENT(state) {
      state.count++;
      state.history.push(`+1 操作，当前值：${state.count}`);
    },

    DECREMENT(state) {
      state.count--;
      state.history.push(`-1 操作，当前值：${state.count}`);
    },

    RESET_COUNT(state) {
      state.count = 0;
      state.history.push(`重置为 0`);
    },

    // 指定数值增加
    ADD_NUMBER(state, num) {
      state.count += num;
      state.history.push(`+${num} 操作，当前值：${state.count}`);
    },

    CLEAR_HISTORY(state) {
      state.history = [];
    },
  },

  actions: {
    // 异步增加（模拟网络延迟）
    incrementAsync({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit("INCREMENT");
          resolve("异步增加成功");
        }, 500);
      });
    },

    // 异步减少
    decrementAsync({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit("DECREMENT");
          resolve("异步减少成功");
        }, 500);
      });
    },

    // 批量操作：先加5，再减2
    batchUpdate({ commit }) {
      commit("ADD_NUMBER", 5);
      setTimeout(() => {
        commit("DECREMENT");
      }, 300);
    },
  },
};

export default counter;
