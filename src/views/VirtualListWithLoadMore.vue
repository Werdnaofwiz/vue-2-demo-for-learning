<template>
  <div class="app">
    <h2>📄 分页 + 虚拟列表（每次请求100条）</h2>
    <div class="info-bar">
      <span
        >总数据：<strong>{{ allData.length }}</strong> 条</span
      >
      <span
        >实际DOM：<strong>{{ visibleData.length }}</strong> 个</span
      >
      <span
        >当前页：<strong>{{ page }}</strong></span
      >
      <span v-if="loading" style="color: #409eff">⏳ 加载中...</span>
      <span v-else-if="finished" style="color: #67c23a">🏁 已全部加载</span>
    </div>

    <div class="scroll-container" ref="scrollContainer" @scroll="handleScroll">
      <!-- 占位容器：撑开滚动条（总高度 = 所有数据 × 条目高度） -->
      <div class="scroll-phantom" :style="{ height: totalHeight + 'px' }">
        <!-- 实际渲染层：通过 translateY 定位 -->
        <div
          class="visible-area"
          :style="{ transform: `translateY(${offsetY}px)` }"
        >
          <div v-for="item in visibleData" :key="item.id" class="list-item">
            <span class="id">#{{ item.id }}</span>
            <span class="text">{{ item.text }}</span>
          </div>
        </div>
      </div>

      <!-- 底部加载状态（触底时的视觉反馈） -->
      <div v-if="!finished && !loading" class="bottom-trigger">
        ↓ 滚动加载更多
      </div>
      <div v-if="loading" class="bottom-trigger loading">⏳ 加载中...</div>
      <div v-if="finished" class="bottom-trigger finished">🏁 已全部加载</div>
    </div>

    <div class="footer-info">
      <button @click="reset">🔄 重置</button>
      <span style="color: #909399; font-size: 13px">
        每次请求 100 条，累积到 {{ allData.length }} 条，DOM 始终约 20 个
      </span>
    </div>
  </div>
</template>

<script>
// ============================================================
// 【API 层】模拟分页接口
// ============================================================
// 模拟后端数据库：10000 条数据
const TOTAL_DB = Array.from({ length: 10000 }, (_, i) => ({
  id: i + 1,
  text: `这是第 ${i + 1} 条数据，内容随机：${Math.random()
    .toString(36)
    .slice(2, 8)}`,
}));

const mockApi = {
  // 模拟请求延迟（固定 200ms，不模拟失败）
  _delay(ms = 200) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },

  // 分页接口：page 从 1 开始，pageSize 默认 100
  async getList(page, pageSize = 100) {
    await this._delay();
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const data = TOTAL_DB.slice(start, end);
    return {
      data,
      hasMore: end < TOTAL_DB.length,
      total: TOTAL_DB.length,
      currentPage: page,
      pageSize,
    };
  },
};

// ============================================================
// 【组件层】
// ============================================================
export default {
  name: "PaginationVirtualList",

  data() {
    return {
      // ---------- 分页相关 ----------
      allData: [], // 累积的所有数据（100 → 200 → 300 ...）
      page: 1, // 当前要请求的页码
      pageSize: 100, // 每次请求 100 条
      loading: false, // 是否正在请求
      finished: false, // 是否全部加载完

      // ---------- 虚拟列表相关 ----------
      itemHeight: 52, // 每条数据固定高度（含 margin）
      bufferSize: 5, // 上下额外多渲染 5 条
      scrollTop: 0, // 当前滚动位置
    };
  },

  computed: {
    // 总高度 = 所有数据 × 单项高度
    totalHeight() {
      return this.allData.length * this.itemHeight;
    },

    // 当前可见范围起始索引
    startIndex() {
      if (this.allData.length === 0) return 0;
      const index = Math.floor(this.scrollTop / this.itemHeight);
      return Math.max(0, index - this.bufferSize);
    },

    // 当前可见范围结束索引
    endIndex() {
      if (this.allData.length === 0) return 0;
      const container = this.$refs.scrollContainer;
      if (!container) return this.bufferSize;
      const index = Math.ceil(
        (this.scrollTop + container.clientHeight) / this.itemHeight,
      );
      return Math.min(this.allData.length, index + this.bufferSize);
    },

    // 当前要渲染的数据（切片）
    visibleData() {
      return this.allData.slice(this.startIndex, this.endIndex);
    },

    // 偏移量：让渲染层对齐滚动位置
    offsetY() {
      return this.startIndex * this.itemHeight;
    },
  },

  mounted() {
    // 首次加载第一页
    this.loadMore();
  },

  methods: {
    // ==================== 加载更多（分页请求） ====================
    async loadMore() {
      // 防止重复请求
      if (this.loading) return;
      if (this.finished) return;

      this.loading = true;

      try {
        const result = await mockApi.getList(this.page, this.pageSize);

        // 追加数据到 allData
        this.allData = this.allData.concat(result.data);

        // 判断是否还有下一页
        if (!result.hasMore) {
          this.finished = true;
        } else {
          this.page++; // 页码 +1，准备请求下一页
        }
      } catch (err) {
        // 不模拟错误，只打印日志
        console.error("请求失败:", err);
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

      // 更新 scrollTop，驱动虚拟列表计算
      this.scrollTop = scrollTop;

      // 触底判断：距离底部小于 50px 时加载更多
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        this.loadMore();
      }
    },

    // ==================== 重置 ====================
    reset() {
      this.allData = [];
      this.page = 1;
      this.loading = false;
      this.finished = false;
      this.scrollTop = 0;
      this.$refs.scrollContainer.scrollTop = 0;
      this.loadMore();
    },
  },
};
</script>

<style scoped>
/* ===== 样式和之前基本一样，只加底部触发器的样式 ===== */
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

.scroll-container {
  height: 500px;
  overflow-y: auto;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  background: #fafafa;
  position: relative;
}

.scroll-phantom {
  position: relative;
}

.visible-area {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  will-change: transform;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  margin-bottom: 6px;
  height: 46px;
  background: #ffffff;
  border-radius: 6px;
  border: 1px solid #ebeef5;
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

/* 底部触发器 */
.bottom-trigger {
  text-align: center;
  padding: 16px 0 8px;
  font-size: 14px;
  color: #c0c4cc;
}
.bottom-trigger.loading {
  color: #409eff;
}
.bottom-trigger.finished {
  color: #67c23a;
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
