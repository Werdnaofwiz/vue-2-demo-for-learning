<template>
  <div class="container">
    <h1>Vue 2 $set 完整示例</h1>

    <hr />

    <!-- 数组 -->
    <div>
      <h3>数组操作</h3>
      <p>当前数组：{{ arr }}</p>
      <button @click="arrSet">$set 修改索引1</button>
      <button @click="arrDirect">直接修改索引1</button>
      <button @click="arrPush">push 新增</button>
      <button @click="arrSplice">splice 替换</button>
      <button @click="arrReset">重置数组</button>
    </div>

    <hr />

    <!-- 对象 -->
    <div>
      <h3>对象操作</h3>
      <p>当前对象：{{ obj }}</p>
      <button @click="objSet">$set 新增属性 c</button>
      <button @click="objDirect">直接新增属性 c</button>
      <button @click="objUpdate">直接修改已有属性 a</button>
      <button @click="objReset">重置对象</button>
    </div>

    <hr />

    <!-- 嵌套 -->
    <div>
      <h3>嵌套数据结构</h3>
      <p>用户信息：{{ user }}</p>
      <button @click="nestedArray">修改嵌套数组 tags[0]</button>
      <button @click="nestedObject">新增嵌套属性 address</button>
    </div>

    <hr />

    <!-- 控制台提示 -->
    <p style="color: red">打开控制台查看数据变化</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: ["a", "b", "c"],
      obj: { a: 1, b: 2 },
      user: {
        name: "张三",
        tags: ["前端", "Vue"],
      },
    };
  },
  methods: {
    // ========== 数组方法 ==========
    arrSet() {
      this.$set(this.arr, 1, "x");
    },
    arrDirect() {
      this.arr[1] = "y";
      console.log("数组变了，但视图没变:", this.arr);
    },
    arrPush() {
      this.arr.push("d");
    },
    arrSplice() {
      this.arr.splice(1, 1, "z");
    },
    arrReset() {
      this.arr = ["a", "b", "c"];
    },

    // ========== 对象方法 ==========
    objSet() {
      this.$set(this.obj, "c", 3);
    },
    objDirect() {
      this.obj.c = 4;
      console.log("对象加了 c，但视图没变:", this.obj);
    },
    objUpdate() {
      this.obj.a = 100;
    },
    objReset() {
      this.obj = { a: 1, b: 2 };
    },

    // ========== 嵌套方法 ==========
    nestedArray() {
      this.$set(this.user.tags, 0, "React");
    },
    nestedObject() {
      this.$set(this.user, "address", "北京");
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px 25%;
}
button {
  margin: 5px;
}
</style>
