<template>
  <div class="app">
    <h2>📄 分页滚动加载（模拟后端分页）</h2>
    <div class="scroll-container" ref="scrollContainer" @scroll="handleScroll">
      <ul class="list">
        <li v-for="item in list" :key="item.id" class="list-item">
          <span class="id">#{{ item.id }}</span>
          <span class="text">{{ item.text }}</span>
        </li>
      </ul>

      <div class="footer">
        <div v-if="loading" class="status loading">⏳ 加载中...</div>
        <div v-else-if="error" class="status error">
          ❌ 加载失败
          <button @click="loadMore(true)">重试</button>
        </div>
        <div v-else-if="finished" class="status finished">
          🏁 已加载全部数据
        </div>
        <div v-else class="status idle">↓ 滚动加载更多</div>
      </div>
    </div>

    <div class="info">
      <p>
        当前数据量：<strong>{{ list.length }}</strong> 条
      </p>
      <p>
        当前页码：<strong>{{ page }}</strong>
      </p>
      <button @click="reset">🔄 重置列表</button>
    </div>
  </div>
</template>

<script>
// ============================================================
// 【API 层】模拟后端接口（通常放在 api/xxx.js 中）
// ============================================================
const mockApi = {
  // 模拟后端数据源（100 条）
  _database: Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    text: `这是第 ${i + 1} 条数据，内容随机：${Math.random()
      .toString(36)
      .slice(2, 8)}`,
  })),

  // 模拟请求延迟
  _delay(ms = 300) {
    return new Promise((resolve) =>
      setTimeout(resolve, ms + Math.random() * 300),
    );
  },

  // ========== 对外暴露的 API 方法 ==========
  async getList(page, pageSize = 10) {
    // 模拟网络延迟
    await this._delay();

    // 模拟 30% 概率请求失败
    if (Math.random() < 0.3) {
      throw new Error("服务器异常，请稍后重试");
    }

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const data = this._database.slice(start, end);
    const total = this._database.length;

    return {
      data, // 当前页数据
      total, // 总条数
      hasMore: end < total, // 是否还有下一页
      currentPage: page,
      pageSize,
    };
  },
};

// ============================================================
// 【组件层】Vue 组件
// ============================================================
export default {
  name: "PaginationScroll",

  data() {
    return {
      list: [], // 已加载的数据
      page: 1, // 当前页码
      pageSize: 10, // 每页条数
      loading: false, // 是否加载中
      error: false, // 是否出错
      finished: false, // 是否全部加载完
    };
  },

  mounted() {
    this.loadMore();
  },

  methods: {
    // ==================== 加载更多 ====================
    async loadMore(isRetry = false) {
      // 防止重复请求
      if (this.loading) return;
      // 重试时忽略 error 状态
      if (!isRetry && this.error) return;
      if (this.finished) return;

      this.loading = true;
      this.error = false;

      try {
        // 调用 API 层
        const result = await mockApi.getList(this.page, this.pageSize);

        // 追加数据
        this.list = this.list.concat(result.data);

        // 判断是否还有下一页
        if (!result.hasMore) {
          this.finished = true;
        } else {
          this.page++; // 页码 +1，准备请求下一页
        }
      } catch (err) {
        console.error("加载失败:", err.message);
        this.error = true;
      } finally {
        this.loading = false;
      }
    },

    // ==================== 滚动监听 ====================
    handleScroll(e) {
      const el = e.target;
      const scrollTop = el.scrollTop;
      const clientHeight = el.clientHeight;
      const scrollHeight = el.scrollHeight;

      // 距离底部小于 30px 时触发加载
      if (scrollTop + clientHeight >= scrollHeight - 30) {
        this.loadMore();
      }
    },

    // ==================== 重置 ====================
    reset() {
      this.list = [];
      this.page = 1;
      this.loading = false;
      this.error = false;
      this.finished = false;
      this.$refs.scrollContainer.scrollTop = 0;
      this.loadMore();
    },
  },
};
</script>

<style scoped>
.app {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif;
}

h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 16px;
}

.scroll-container {
  height: 500px;
  overflow-y: auto;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  padding: 8px 12px;
  background: #fafafa;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  margin-bottom: 6px;
  background: #ffffff;
  border-radius: 6px;
  border: 1px solid #ebeef5;
  transition: background 0.15s;
}

.list-item:hover {
  background: #f0f2f5;
}

.id {
  flex-shrink: 0;
  width: 50px;
  font-size: 13px;
  font-weight: 600;
  color: #909399;
}

.text {
  font-size: 14px;
  color: #303133;
}

/* 底部状态 */
.footer {
  text-align: center;
  padding: 16px 0 8px;
}

.status {
  font-size: 14px;
  color: #909399;
}

.status.loading {
  color: #409eff;
}
.status.error {
  color: #f56c6c;
}
.status.finished {
  color: #67c23a;
}

.error button {
  margin-left: 8px;
  padding: 2px 14px;
  border: 1px solid #f56c6c;
  border-radius: 4px;
  background: #fff;
  color: #f56c6c;
  cursor: pointer;
  font-size: 13px;
}
.error button:hover {
  background: #fef0f0;
}

/* 信息面板 */
.info {
  margin-top: 16px;
  padding: 14px 18px;
  background: #f4f6f9;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
}

.info p {
  margin: 0;
  font-size: 14px;
  color: #606266;
}

.info strong {
  color: #303133;
  font-size: 16px;
}

.info button {
  padding: 6px 20px;
  border: none;
  border-radius: 6px;
  background: #409eff;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}
.info button:hover {
  background: #66b1ff;
}
</style>
