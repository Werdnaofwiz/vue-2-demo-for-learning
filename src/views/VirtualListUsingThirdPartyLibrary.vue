<template>
  <div class="app">
    <h2>📄 vue-virtual-scroller + 触底分页加载</h2>
    <div class="info-bar">
      <span
        >总数据：<strong>{{ allData.length }}</strong> 条</span
      >
      <span
        >当前页：<strong>{{ page }}</strong></span
      >
    </div>

    <!-- ========== 改动在这里 ========== -->
    <RecycleScroller
      class="scroller"
      :items="allData"
      :item-size="52"
      key-field="id"
      @scroll.native="handleScroll"
      ref="scrollerRef"
    >
      <template v-slot="{ item }">
        <div class="list-item">
          <span class="id">#{{ item.id }}</span>
          <span class="text">{{ item.text }}</span>
        </div>
      </template>

      <!-- 底部插槽 -->
      <template #after>
        <div v-if="!finished" class="load-more-trigger">
          <div v-if="loading" class="status loading">⏳ 加载中...</div>
        </div>
        <div v-else class="load-more-trigger">
          <div class="status finished">🏁 已加载全部数据</div>
        </div>
      </template>
    </RecycleScroller>

    <div class="footer-info">
      <button @click="reset">🔄 重置</button>
      <span style="color: #909399; font-size: 13px">
        每次请求 100 条，已加载 {{ allData.length }} 条
      </span>
    </div>
  </div>
</template>

<script>
import { RecycleScroller } from "vue-virtual-scroller";

// ============================================================
// API 层（和之前完全一样）
// ============================================================
const TOTAL_DB = Array.from({ length: 10000 }, (_, i) => ({
  id: i + 1,
  text: `这是第 ${i + 1} 条数据，内容随机：${Math.random()
    .toString(36)
    .slice(2, 8)}`,
}));

const mockApi = {
  _delay(ms = 200) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },
  async getList(page, pageSize = 100) {
    await this._delay();
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const data = TOTAL_DB.slice(start, end);
    return {
      data,
      hasMore: end < TOTAL_DB.length,
    };
  },
};

// ============================================================
// 组件
// ============================================================
export default {
  name: "VirtualScrollerDemo",
  components: { RecycleScroller },

  data() {
    return {
      allData: [],
      page: 1,
      pageSize: 100,
      loading: false,
      finished: false,
    };
  },

  mounted() {
    this.loadMore();
  },

  methods: {
    async loadMore() {
      if (this.loading || this.finished) return;
      this.loading = true;
      try {
        const res = await mockApi.getList(this.page, this.pageSize);
        this.allData = this.allData.concat(res.data);
        this.page++;
        this.finished = !res.hasMore;
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    handleScroll(e) {
      const el = e.target;
      // 触底判断：距离底部小于 50px 时加载更多
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) {
        this.loadMore();
      }
    },

    reset() {
      this.allData = [];
      this.page = 1;
      this.loading = false;
      this.finished = false;
      this.$refs.scrollerRef.$el.scrollTop = 0;
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
  margin-bottom: 12px;
}

.info-bar {
  display: flex;
  justify-content: space-around;
  padding: 10px;
  background: #f4f6f9;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 14px;
  color: #606266;
  flex-wrap: wrap;
  gap: 8px;
}
.info-bar strong {
  color: #409eff;
  font-size: 16px;
}

.scroller {
  height: 500px;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  background: #fafafa;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  height: 46px;
  background: #ffffff;
  border-bottom: 1px solid #ebeef5;
  box-sizing: border-box;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 底部加载触发器 */
.load-more-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 52px; /* 和列表项高度一致，滚动时视觉对齐 */
  padding: 0 14px;
  font-size: 14px;
  color: #909399;
  border-bottom: 1px solid #ebeef5; /* 和列表项边框统一 */
  background: #fafafa; /* 略淡于列表项，表示这是底部状态区 */
}

.load-more-trigger .loading {
  color: #409eff;
}

.load-more-trigger .finished {
  color: #67c23a;
}

.load-more-trigger .idle {
  color: #c0c4cc;
}

.footer-info {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
.footer-info button {
  padding: 6px 20px;
  border: none;
  border-radius: 6px;
  background: #409eff;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}
.footer-info button:hover {
  background: #66b1ff;
}
</style>
