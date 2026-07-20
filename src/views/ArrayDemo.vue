<!-- src/views/ArrayDemo.vue -->
<template>
  <div class="array-demo">
    <div class="header">
      <button class="back-btn" @click="goBack">← 返回首页</button>
      <h1>📊 Vue 2 数组变异方法</h1>
      <p>学习数组的 7 个变异方法，以及 $set 的用法</p>
      <p style="color: #666; font-size: 14px">
        💡 请打开浏览器控制台 (F12) 查看操作日志
      </p>
    </div>

    <div class="demo-box">
      <h3>当前数组</h3>
      <div class="array-display">
        <span v-for="(item, index) in items" :key="index" class="item">
          {{ item }}
        </span>
        <span v-if="!items.length" class="empty">[] 空数组</span>
      </div>
      <p>数组长度: {{ items.length }}</p>
    </div>

    <div class="controls">
      <div class="control-group">
        <h4>✅ 响应式操作（会触发更新）</h4>
        <button @click="pushItem">push(4)</button>
        <button @click="popItem">pop()</button>
        <button @click="shiftItem">shift()</button>
        <button @click="unshiftItem">unshift(0)</button>
        <button @click="spliceItem">splice(1, 1, 99)</button>
        <button @click="sortItem">sort()</button>
        <button @click="reverseItem">reverse()</button>
        <button class="good" @click="setItem">$set(0, 'x')</button>
      </div>

      <div class="control-group">
        <h4>❌ 非响应式操作（不会触发更新）</h4>
        <button class="bad" @click="badIndex">items[0] = 'x'</button>
        <button class="bad" @click="badLength">items.length = 2</button>
      </div>

      <div class="control-group">
        <button class="force" @click="forceUpdate">
          🔄 强制更新（查看真实数据）
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArrayDemo",
  data() {
    return {
      items: [1, 2, 3],
    };
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },

    // --- 响应式操作（会触发更新） ---
    pushItem() {
      this.items.push(4);
      console.log("✅ items.push(4) → 数组长度:", this.items.length);
      console.log("   当前数组:", JSON.stringify(this.items));
    },

    popItem() {
      const val = this.items.pop();
      console.log("✅ items.pop() → 删除了:", val);
      console.log("   当前数组:", JSON.stringify(this.items));
    },

    shiftItem() {
      const val = this.items.shift();
      console.log("✅ items.shift() → 删除了:", val);
      console.log("   当前数组:", JSON.stringify(this.items));
    },

    unshiftItem() {
      this.items.unshift(0);
      console.log("✅ items.unshift(0) → 数组长度:", this.items.length);
      console.log("   当前数组:", JSON.stringify(this.items));
    },

    spliceItem() {
      this.items.splice(1, 1, 99);
      console.log("✅ items.splice(1, 1, 99) → 替换索引1为99");
      console.log("   当前数组:", JSON.stringify(this.items));
    },

    sortItem() {
      this.items.sort((a, b) => a - b);
      console.log("✅ items.sort() → 排序完成");
      console.log("   当前数组:", JSON.stringify(this.items));
    },

    reverseItem() {
      this.items.reverse();
      console.log("✅ items.reverse() → 反转完成");
      console.log("   当前数组:", JSON.stringify(this.items));
    },

    setItem() {
      this.$set(this.items, 0, "x");
      console.log('✅ this.$set(items, 0, "x") → 索引0改为"x"');
      console.log("   当前数组:", JSON.stringify(this.items));
    },

    // --- 非响应式操作（不会触发更新） ---
    badIndex() {
      this.items[0] = "x";
      console.warn('❌ items[0] = "x" → 数据变了，但视图不会自动更新！');
      console.warn("   当前数组真实数据:", JSON.stringify(this.items));
      console.warn("   💡 提示：请使用 $set 或 splice 替代");
    },

    badLength() {
      this.items.length = 2;
      console.warn("❌ items.length = 2 → 数据变了，但视图不会自动更新！");
      console.warn("   当前数组真实数据:", JSON.stringify(this.items));
      console.warn("   💡 提示：请使用 splice 替代");
    },

    // --- 强制更新 ---
    forceUpdate() {
      this.$forceUpdate();
      console.log("🔄 强制更新 → 视图已刷新，现在显示的是真实数据");
      console.log("   当前数组:", JSON.stringify(this.items));
    },
  },
};
</script>

<style scoped>
.array-demo {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  margin-bottom: 30px;
}

.back-btn {
  padding: 8px 16px;
  background: #ecf0f1;
  border: 1px solid #bdc3c7;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.back-btn:hover {
  background: #d5dbdb;
}

.demo-box {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.array-display {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 15px;
  background: white;
  border-radius: 6px;
  min-height: 60px;
  border: 1px dashed #dee2e6;
}

.item {
  display: inline-block;
  background: #42b983;
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-weight: bold;
}

.empty {
  color: #adb5bd;
  font-style: italic;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
}

.control-group {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
}

.control-group h4 {
  margin: 0 0 10px 0;
  font-size: 14px;
}

button {
  padding: 8px 16px;
  margin: 4px;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

button:hover:not(.bad):not(.good):not(.force) {
  background: #e9ecef;
}

.bad {
  background: #ff6b6b;
  color: white;
  border-color: #fa5252;
}

.bad:hover {
  background: #fa5252;
}

.good {
  background: #51cf66;
  color: white;
  border-color: #40c057;
}

.good:hover {
  background: #40c057;
}

.force {
  background: #4dabf7;
  color: white;
  border-color: #339af0;
}

.force:hover {
  background: #339af0;
}
</style>
