// mixins/logger.js
const loggerMixin = {
  data() {
    return {
      logCount: 0,
    };
  },
  methods: {
    logAction(action) {
      this.logCount++;
      console.log(
        `[${new Date().toLocaleTimeString()}] 执行: ${action}，已记录 ${
          this.logCount
        } 次`,
      );
    },
  },
  mounted() {
    console.log("loggerMixin 已挂载");
  },
};

export default loggerMixin;
