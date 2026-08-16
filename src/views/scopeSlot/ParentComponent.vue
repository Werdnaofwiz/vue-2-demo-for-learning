<!-- Parent.vue -->
<template>
  <div style="padding: 20px">
    <h3>用户列表（el-table 风格）</h3>

    <MyTable :data="userList" :columns="columns">
      <!-- 
        只有需要自定义的列才传插槽
        插槽名就是 column 的 prop
      -->

      <!-- 姓名列：自定义渲染，加个图标，点击打印 ID -->
      <template v-slot:name="{ row }">
        <span @click="handlePrintId(row.id)" style="cursor: pointer">
          👤 {{ row.name }}
        </span>
      </template>

      <!-- 年龄列：自定义渲染，加个后缀 -->
      <template v-slot:age="{ row }">
        <span :style="{ color: row.age >= 30 ? 'red' : 'green' }">
          {{ row.age }} 岁
        </span>
      </template>

      <!-- 邮箱列：用默认渲染，不传插槽，直接显示 row.email -->

      <!-- 操作列：自定义渲染，放按钮 -->
      <template v-slot:actions="{ row }">
        <button @click="handlePrintId(row.id)">打印ID</button>
        <button @click="handleShowDetail(row)">查看详情</button>
      </template>
    </MyTable>
  </div>
</template>

<script>
// 在表格组件场景中，数据（data）在子组件里循环，但点击行之后要干什么（比如打印ID、跳转详情、删除请求）
// 属于父组件的业务逻辑，子组件作为通用组件不可能预知这些行为——作用域插槽就是连接两者的桥梁：子组件通过
// slot 把每行的 row 数据"借"给父组件，父组件拿到 row.id 后自由定义点击事件。
import MyTable from "./MyTable.vue";

export default {
  components: { MyTable },
  data() {
    return {
      userList: [
        { id: 1001, name: "张三", age: 25, email: "zhangsan@example.com" },
        { id: 1002, name: "李四", age: 30, email: "lisi@example.com" },
        { id: 1003, name: "王五", age: 28, email: "wangwu@example.com" },
        { id: 1004, name: "赵六", age: 35, email: "zhaoliu@example.com" },
      ],
      columns: [
        { prop: "name", label: "姓名", width: "150px" },
        { prop: "age", label: "年龄", width: "120px" },
        { prop: "email", label: "邮箱" }, // 没有 width，自动撑满
        { prop: "actions", label: "操作", width: "200px" },
      ],
    };
  },
  methods: {
    handlePrintId(id) {
      alert(`打印 ID：${id}`);
    },
    handleShowDetail(row) {
      alert(`查看用户：${row.name}（ID: ${row.id}）`);
    },
  },
};
</script>

<style scoped>
button {
  margin-left: 5px;
}
</style>
