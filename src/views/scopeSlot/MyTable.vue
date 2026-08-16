<!-- MyTable.vue -->
<template>
  <div class="my-table">
    <!-- 表头 -->
    <div class="my-table-header">
      <div
        v-for="col in columns"
        :key="col.prop"
        class="my-table-cell"
        :style="{ width: col.width || 'auto' }"
      >
        {{ col.label }}
      </div>
    </div>

    <!-- 表体：循环每一行 -->
    <div v-for="(row, index) in data" :key="row.id" class="my-table-row">
      <!-- 循环每一列 -->
      <div
        v-for="col in columns"
        :key="col.prop"
        class="my-table-cell"
        :style="{ width: col.width || 'auto' }"
      >
        <!-- 
          核心逻辑：判断这一列是否需要自定义渲染
          如果父组件传了对应列的插槽，就用插槽
          否则直接用 row[col.prop] 渲染
        -->
        <slot :name="col.prop" :row="row" :index="index">
          <!-- 默认渲染：直接显示数据 -->
          {{ row[col.prop] }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyTable",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.my-table {
  border: 1px solid #ddd;
  border-radius: 4px;
}
.my-table-header {
  display: flex;
  background: #f5f7fa;
  border-bottom: 1px solid #ddd;
}
.my-table-row {
  display: flex;
  border-bottom: 1px solid #eee;
}
.my-table-row:hover {
  background: #f5f7fa;
}
.my-table-cell {
  flex: 1;
  padding: 8px 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
