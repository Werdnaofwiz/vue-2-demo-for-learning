<template>
  <div class="container">
    <h1>自定义指令基础案例合集</h1>

    <!-- ==================== 案例1：自动聚焦 ==================== -->
    <section class="demo-section">
      <h2>案例1：自动聚焦 (v-focus)</h2>
      <p>页面加载后，这个输入框自动获得焦点</p>
      <input type="text" v-focus placeholder="我会自动聚焦" />
      <input type="text" placeholder="我不会聚焦（用来对比）" />
    </section>

    <!-- ==================== 案例2：动态修改颜色 ==================== -->
    <section class="demo-section">
      <h2>案例2：动态修改颜色 (v-color)</h2>
      <p v-color="'red'">我是红色的文字</p>
      <p v-color="'blue'">我是蓝色的文字</p>
      <p v-color="colorValue">我是动态颜色的文字（点下面按钮变绿）</p>
      <button @click="colorValue = 'green'">变绿色</button>
      <button @click="colorValue = 'orange'">变橙色</button>
    </section>

    <!-- ==================== 案例3：文字大小 ==================== -->
    <section class="demo-section">
      <h2>案例3：动态文字大小 (v-font-size)</h2>
      <p v-font-size="20">我的字号是20px</p>
      <p v-font-size="sizeValue">我的字号是动态的：{{ sizeValue }}px</p>
      <input type="range" min="12" max="40" v-model="sizeValue" />
      <span>{{ sizeValue }}px</span>
    </section>

    <!-- ==================== 案例4：点击防抖 ==================== -->
    <section class="demo-section">
      <h2>案例4：点击防抖 (v-debounce)</h2>
      <p>快速狂点按钮，只有最后一次点击生效（防抖延迟500ms）</p>
      <button v-debounce="handleClick">点我（防抖）</button>
      <button @click="handleClick">点我（无防抖，用来对比）</button>
      <p>点击次数：{{ clickCount }}</p>
    </section>

    <!-- ==================== 案例5：权限控制 ==================== -->
    <section class="demo-section">
      <h2>案例5：权限控制 (v-permission)</h2>
      <p>当前用户角色：{{ userRole }}</p>
      <button @click="toggleRole">切换角色（admin / guest）</button>
      <div v-permission="'admin'">
        <p class="text-green">✅ 这是只有 admin 才能看到的内容</p>
      </div>
      <div v-permission="'guest'">
        <p class="text-blue">✅ 这是只有 guest 才能看到的内容</p>
      </div>
    </section>

    <!-- ==================== 案例6：指令的职责边界 ==================== -->
    <section class="demo-section">
      <h2>案例6：指令的职责边界 (v-format)</h2>

      <div class="tip-box tip-box-warning">
        <p class="tip-text">
          💡 <strong>核心原则：</strong>自定义指令只负责 DOM 操作，不修改数据。
          数据修改统一由 Vue 组件处理，保持单向数据流。
        </p>
      </div>

      <!-- 错误示范 -->
      <div class="demo-box demo-box-danger">
        <h3 class="box-title-danger">❌ 错误：指令直接改 value</h3>
        <p class="text-danger">
          按 Enter 键，输入框的值会转为大写，但
          <code>v-model</code> 绑定的数据不会更新
        </p>
        <input
          type="text"
          v-format-wrong="wrongValue"
          placeholder="输入内容后按 Enter"
        />
        <p class="text-danger">
          数据：{{ wrongValue }}
          <span class="text-error">⚠️ 数据和DOM脱节了！</span>
        </p>
      </div>

      <!-- 正确示范 -->
      <div class="demo-box demo-box-success">
        <h3 class="box-title-success">✅ 正确：指令只操作 DOM，组件修改数据</h3>
        <p class="text-success">
          按 Enter 键，指令把输入框值转为大写，组件通过
          <code>@change</code> 同步数据
        </p>
        <input
          type="text"
          v-format-right="rightValue"
          placeholder="输入内容后按 Enter"
          @change="onFormatChange"
        />
        <p class="text-success">
          数据：{{ rightValue }}
          <span class="text-success">✅ 数据和DOM同步</span>
        </p>
        <div class="code-box">
          <p class="code-text">
            🔑 <strong>关键思路：</strong>指令只负责改 DOM 显示（转大写），
            组件通过 <code>@change</code> 拿到值后修改数据。
          </p>
        </div>
      </div>
    </section>

    <!-- ==================== 案例7：下拉菜单（新增） ==================== -->
    <section class="demo-section">
      <h2>案例7：下拉菜单 (v-dropdown)</h2>
      <p>点击按钮展开/收起下拉菜单，点击页面其他区域自动收起</p>

      <div v-dropdown class="dropdown-wrapper">
        <button class="dropdown-toggle">下拉菜单 ▾</button>
        <ul class="dropdown-menu">
          <li><a href="#">选项一</a></li>
          <li><a href="#">选项二</a></li>
          <li><a href="#">选项三</a></li>
        </ul>
      </div>
    </section>

    <!-- ==================== 案例8：相对时间转换（新增） ==================== -->
    <section class="demo-section">
      <h2>案例8：相对时间转换 (v-relative-time)</h2>
      <p>传入时间戳，自动显示为"刚刚 / X分钟前 / X小时前 / X天前"</p>

      <div class="relative-time-demo">
        <p>
          <strong>当前时间：</strong>
          <span v-relative-time="nowTimestamp"></span>
          <span class="text-muted">（刚刚）</span>
        </p>
        <p>
          <strong>3分钟前：</strong>
          <span v-relative-time="threeMinutesAgo"></span>
          <span class="text-muted">（3分钟前）</span>
        </p>
        <p>
          <strong>1小时前：</strong>
          <span v-relative-time="oneHourAgo"></span>
          <span class="text-muted">（1小时前）</span>
        </p>
        <p>
          <strong>1天前：</strong>
          <span v-relative-time="oneDayAgo"></span>
          <span class="text-muted">（1天前）</span>
        </p>
        <p>
          <strong>3天前：</strong>
          <span v-relative-time="threeDaysAgo"></span>
          <span class="text-muted">（3天前）</span>
        </p>
        <p>
          <strong>动态数据（点按钮更新时间戳）：</strong>
          <span v-relative-time="dynamicTimestamp"></span>
          <button @click="updateTimestamp">更新时间</button>
        </p>
      </div>
    </section>

    <hr />
    <DirectiveNotes />
  </div>
</template>

<script>
import DirectiveNotes from "@/views/customDirectives/DirectiveNotes.vue";

export default {
  name: "CustomDirectiveDemo",
  components: {
    DirectiveNotes,
  },

  // ============================================
  // 1. 局部注册所有自定义指令
  // ============================================
  directives: {
    // ---------- 案例1：自动聚焦 ----------
    focus: {
      inserted(el) {
        el.focus();
      },
    },

    // ---------- 案例2：动态颜色 ----------
    color: {
      bind(el, binding) {
        el.style.color = binding.value;
      },
      update(el, binding) {
        el.style.color = binding.value;
      },
    },

    // ---------- 案例3：动态文字大小 ----------
    "font-size": {
      bind(el, binding) {
        el.style.fontSize = binding.value + "px";
      },
      update(el, binding) {
        el.style.fontSize = binding.value + "px";
      },
    },

    // ---------- 案例4：点击防抖 ----------
    debounce: {
      bind(el, binding) {
        let timer = null;

        const handler = () => {
          if (timer) clearTimeout(timer);
          timer = setTimeout(() => {
            binding.value();
            timer = null;
          }, 500);
        };

        el.addEventListener("click", handler);

        el.__debounce = {
          handler,
          cleanup: () => {
            if (timer) {
              clearTimeout(timer);
              timer = null;
            }
          },
        };
      },

      unbind(el) {
        if (el.__debounce) {
          el.removeEventListener("click", el.__debounce.handler);
          el.__debounce.cleanup();
          el.__debounce = null;
        }
      },
    },

    // ---------- 案例5：权限控制 ----------
    permission: {
      bind(el, binding, vnode) {
        const requiredRole = binding.value;

        const checkPermission = () => {
          const vm = vnode.context;
          const currentRole = vm?.userRole || "guest";
          if (currentRole !== requiredRole) {
            el.style.display = "none";
          } else {
            el.style.display = "";
          }
        };

        checkPermission();
        el.__checkPermission = checkPermission;
      },

      update(el) {
        if (el.__checkPermission) {
          el.__checkPermission();
        }
      },

      unbind(el) {
        el.__checkPermission = null;
      },
    },

    // ---------- 案例6：指令的职责边界 ----------
    formatWrong: {
      bind(el) {
        const handler = (e) => {
          if (e.key === "Enter") {
            el.value = el.value.toUpperCase();
          }
        };

        el.addEventListener("keydown", handler);
        el.__formatWrongHandler = handler;
      },

      unbind(el) {
        if (el.__formatWrongHandler) {
          el.removeEventListener("keydown", el.__formatWrongHandler);
          el.__formatWrongHandler = null;
        }
      },
    },

    formatRight: {
      bind(el) {
        const handler = (e) => {
          if (e.key === "Enter") {
            el.value = el.value.toUpperCase();
            el.dispatchEvent(new Event("change", { bubbles: true }));
          }
        };

        el.addEventListener("keydown", handler);
        el.__formatRightHandler = handler;
      },

      unbind(el) {
        if (el.__formatRightHandler) {
          el.removeEventListener("keydown", el.__formatRightHandler);
          el.__formatRightHandler = null;
        }
      },
    },

    // ---------- 案例7：下拉菜单（新增） ----------
    dropdown: {
      bind(el) {
        const toggle = el.querySelector(".dropdown-toggle");
        const menu = el.querySelector(".dropdown-menu");

        if (!toggle || !menu) return;

        // 点击 toggle 切换菜单
        const toggleHandler = (e) => {
          e.stopPropagation();
          menu.classList.toggle("show");
        };

        // 点击页面其他区域关闭菜单
        const outsideHandler = () => {
          menu.classList.remove("show");
        };

        // 点击菜单内部不关闭（阻止冒泡）
        const menuHandler = (e) => {
          e.stopPropagation();
        };

        toggle.addEventListener("click", toggleHandler);
        menu.addEventListener("click", menuHandler);
        document.addEventListener("click", outsideHandler);

        // 存起来供 unbind 清理
        el.__dropdown = {
          toggleHandler,
          outsideHandler,
          menuHandler,
        };
      },

      unbind(el) {
        if (el.__dropdown) {
          const toggle = el.querySelector(".dropdown-toggle");
          const menu = el.querySelector(".dropdown-menu");

          if (toggle) {
            toggle.removeEventListener("click", el.__dropdown.toggleHandler);
          }
          if (menu) {
            menu.removeEventListener("click", el.__dropdown.menuHandler);
          }
          document.removeEventListener("click", el.__dropdown.outsideHandler);

          el.__dropdown = null;
        }
      },
    },

    // ---------- 案例8：相对时间转换（新增） ----------
    "relative-time": {
      bind(el, binding) {
        // 格式化函数
        const formatRelativeTime = (timestamp) => {
          if (!timestamp) return "无效时间";

          const now = Date.now();
          const diff = now - timestamp;

          // 小于1分钟
          if (diff < 60000) {
            return "刚刚";
          }
          // 小于1小时
          if (diff < 3600000) {
            return Math.floor(diff / 60000) + "分钟前";
          }
          // 小于24小时
          if (diff < 86400000) {
            return Math.floor(diff / 3600000) + "小时前";
          }
          // 小于30天
          if (diff < 2592000000) {
            return Math.floor(diff / 86400000) + "天前";
          }
          // 超过30天，显示具体日期
          const date = new Date(timestamp);
          return (
            date.getFullYear() +
            "-" +
            String(date.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(date.getDate()).padStart(2, "0")
          );
        };

        // 更新显示
        const update = () => {
          el.textContent = formatRelativeTime(binding.value);
        };

        // 立即执行一次
        update();

        // 每分钟更新一次（定时器）
        const timer = setInterval(update, 60000);

        // 存起来供 unbind 清理
        el.__relativeTime = {
          timer,
          update,
        };
      },

      update(el) {
        // 当传入的时间戳变化时，重新计算
        if (el.__relativeTime) {
          el.__relativeTime.update();
        }
      },

      unbind(el) {
        if (el.__relativeTime) {
          clearInterval(el.__relativeTime.timer);
          el.__relativeTime = null;
        }
      },
    },
  },

  // ============================================
  // 2. 数据
  // ============================================
  data() {
    const now = Date.now();
    return {
      colorValue: "purple",
      sizeValue: 24,
      clickCount: 0,
      userRole: "admin",

      // 案例6 的数据
      wrongValue: "初始值",
      rightValue: "初始值",

      // 案例8 相对时间的数据
      nowTimestamp: now,
      threeMinutesAgo: now - 3 * 60 * 1000,
      oneHourAgo: now - 1 * 3600 * 1000,
      oneDayAgo: now - 1 * 86400 * 1000,
      threeDaysAgo: now - 3 * 86400 * 1000,
      dynamicTimestamp: now,
    };
  },

  // ============================================
  // 3. 方法
  // ============================================
  methods: {
    handleClick() {
      this.clickCount++;
      console.log("点击了按钮，当前次数：", this.clickCount);
    },

    toggleRole() {
      this.userRole = this.userRole === "admin" ? "guest" : "admin";
      console.log("当前角色：", this.userRole);
    },

    onFormatChange(e) {
      this.rightValue = e.target.value;
      console.log("📌 change 事件触发，数据已更新：", this.rightValue);
    },

    // 案例8：更新时间戳
    updateTimestamp() {
      this.dynamicTimestamp = Date.now();
      console.log("🕐 时间戳已更新");
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.demo-section {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  background: #f9f9f9;
}

.demo-section h2 {
  margin-top: 0;
  color: #2c3e50;
  font-size: 18px;
  border-bottom: 2px solid #42b983;
  padding-bottom: 8px;
}

/* ===== 案例6 专用样式 ===== */
.tip-box {
  padding: 12px 16px;
  border-radius: 6px;
  margin-bottom: 16px;
}

.tip-box-warning {
  background: #fff3cd;
  border: 1px solid #ffc107;
}

.tip-text {
  margin: 0;
  color: #856404;
}

.demo-box {
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 12px;
}

.demo-box-danger {
  background: #f8d7da;
  border: 1px solid #f5c6cb;
}

.demo-box-success {
  background: #d4edda;
  border: 1px solid #c3e6cb;
}

.box-title-danger {
  margin-top: 0;
  color: #721c24;
}

.box-title-success {
  margin-top: 0;
  color: #155724;
}

.text-green {
  color: #28a745;
}

.text-blue {
  color: #007bff;
}

.text-danger {
  color: #721c24;
}

.text-success {
  color: #155724;
}

.text-error {
  color: #e74c3c;
}

.text-muted {
  color: #999;
  font-size: 13px;
}

.code-box {
  background: #c3e6cb;
  padding: 10px;
  border-radius: 4px;
  margin-top: 12px;
}

.code-text {
  margin: 0;
  color: #155724;
  font-size: 14px;
}

code {
  background: rgba(0, 0, 0, 0.08);
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 13px;
  font-family: monospace;
}

input[type="text"] {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  font-size: 14px;
  width: 300px;
}

input[type="text"]:focus {
  outline: 2px solid #42b983;
  border-color: #42b983;
}

button {
  padding: 8px 16px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 4px;
  font-size: 14px;
}

button:hover {
  background: #359268;
}

input[type="range"] {
  width: 200px;
  vertical-align: middle;
}

p {
  margin: 8px 0;
}

/* ===== 案例7：下拉菜单样式 ===== */
.dropdown-wrapper {
  position: relative;
  display: inline-block;
}

.dropdown-toggle {
  padding: 10px 20px;
  background: #42b983;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin: 0;
}

.dropdown-toggle:hover {
  background: #359268;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  padding: 8px 0;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  list-style: none;
  min-width: 150px;
  display: none;
  z-index: 100;
}

.dropdown-menu.show {
  display: block;
}

.dropdown-menu li {
  padding: 0;
}

.dropdown-menu li a {
  display: block;
  padding: 8px 20px;
  color: #333;
  text-decoration: none;
  font-size: 14px;
}

.dropdown-menu li a:hover {
  background: #f5f7fa;
}

/* ===== 案例8：相对时间样式 ===== */
.relative-time-demo p {
  padding: 6px 0;
  border-bottom: 1px dashed #eee;
}

.relative-time-demo p:last-child {
  border-bottom: none;
}

.relative-time-demo button {
  margin-left: 12px;
}
</style>
