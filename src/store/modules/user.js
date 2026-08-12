// 用户模块
const user = {
  // 开启命名空间，防止模块间方法名冲突（强烈建议开启）
  namespaced: true,

  state: {
    name: "张三",
    age: 25,
    email: "zhangsan@example.com",
    isLogin: false,
  },

  getters: {
    // 获取用户完整信息
    userInfo: (state) => `${state.name}，${state.age}岁，邮箱：${state.email}`,

    // 判断是否成年
    isAdult: (state) => state.age >= 18,

    // 登录状态
    loginStatus: (state) => (state.isLogin ? "已登录" : "未登录"),
  },

  mutations: {
    SET_USER_NAME(state, newName) {
      state.name = newName;
    },
    SET_USER_AGE(state, newAge) {
      state.age = newAge;
    },
    SET_USER_EMAIL(state, newEmail) {
      state.email = newEmail;
    },
    SET_LOGIN_STATUS(state, status) {
      state.isLogin = status;
    },
    // 重置用户信息
    RESET_USER(state) {
      state.name = "张三";
      state.age = 25;
      state.email = "zhangsan@example.com";
      state.isLogin = false;
    },
  },

  actions: {
    // 异步登录（模拟）
    login({ commit }, userData) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit("SET_USER_NAME", userData.name);
          commit("SET_USER_AGE", userData.age);
          commit("SET_USER_EMAIL", userData.email);
          commit("SET_LOGIN_STATUS", true);
          resolve("登录成功");
        }, 500);
      });
    },

    // 异步登出
    logout({ commit }) {
      commit("RESET_USER");
    },

    // 异步更新年龄（校验）
    updateAge({ commit }, age) {
      if (age < 0 || age > 150) {
        return Promise.reject("年龄必须在0-150之间");
      }
      commit("SET_USER_AGE", age);
      return Promise.resolve("更新成功");
    },
  },
};

export default user;
