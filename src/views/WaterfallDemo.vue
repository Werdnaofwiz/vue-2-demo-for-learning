<template>
  <div class="waterfall-container" ref="container">
    <!-- 
      ============================================================
      📐 瀑布流布局实现方案（技术选型分析）
      ============================================================
      
      实现瀑布流有三种思路：
      
      方案一：纯 CSS
      ──────────────
      使用 column-count 或 flex 布局
      ❌ 致命缺陷：内容会被垂直截断，顺序错乱
      ❌ 无法精确控制每张图片的归属列
      ❌ 结论：纯 CSS 无法实现真正的瀑布流
      
      
      方案二：纯 JavaScript
      ──────────────────
      使用 JS 计算每个元素的位置，通过 position: absolute 精确定位
      ✅ 控制力最强，可以实现任何复杂效果
      ❌ 代码复杂，需要手动计算 top/left
      ❌ 元素脱离文档流，后续维护麻烦
      ❌ 性能开销大（大量 DOM 操作）
      
      
      方案三：CSS + JS 结合（本方案采用）⭐
      ──────────────────────────────
      CSS：负责多列容器和垂直排列（Flex）
      JS：负责核心的分配算法（找最短列）
      ✅ 代码清晰，职责分明
      ✅ 性能好（浏览器处理垂直排列）
      ✅ 元素在文档流中，维护方便
      ✅ 结论：这是实现瀑布流的最佳实践
      
      
      ⚠️ 重要前提：宽度固定
      ──────────────────────
      在瀑布流中，所有列的宽度必须一致！
      原因：
      ① 如果宽度不同，无法通过简单的"高度"来衡量列的长度
      ② 不同宽度的列，视觉上无法对齐，失去瀑布流的美感
      ③ 宽度固定后，唯一变化的维度就是高度
      
      因此我们可以：
      ① 根据屏幕宽度 ÷ (列宽 + 间距) 算出列数
      ② 每列宽度固定，只关注高度变化
      ③ 用"最短列优先"策略分配图片
      
      
      ============================================================
      🎯 核心算法："最短列优先" 贪心策略
      ============================================================
      
      1. 数据准备
         ──────────
         每张图片必须预先知道高度（从后端获取或预加载计算）
         因为我们需要根据高度来决定"放哪一列"
      
      2. 计算列数
         ──────────
         colCount = floor((容器宽度 + 间距) / (列宽 + 间距))
         例如：容器 840px，列宽 200px，间距 20px
         (840 + 20) / (200 + 20) = 3.9 → 取整为 3 列
      
      3. 分配策略（贪心算法）
         ──────────────────
         维护一个数组 colHeights = [h1, h2, h3, ...]
         每张图片都放到「当前总高度最小」的那一列
         放完后更新该列的高度
      
      4. 为什么叫"贪心"？
         ──────────────────
         每次都选"当前看起来最优"的方案（最短列）
         不考虑未来的图片，只看眼前
         在瀑布流场景下，贪心策略效果接近最优
      
      
      ============================================================
      📊 数据结构说明
      ============================================================
      
      list: 原始图片数据（包含 id, image, title, height）
      columns: 二维数组，存储分配到各列的图片
               columns[0] = [图片1, 图片4, 图片7]  // 第1列
               columns[1] = [图片2, 图片5, 图片8]  // 第2列
               columns[2] = [图片3, 图片6, 图片9]  // 第3列
      colHeights: 一维数组，记录每列当前总高度
                  colHeights = [320, 470, 300]    // 3列的高度
      
      
      ============================================================
      🔄 完整流程
      ============================================================
      
      ① 生成图片数据（包含高度信息）
         ↓
      ② 根据容器宽度计算列数
         ↓
      ③ 初始化 columns = [[], [], []] 和 colHeights = [0, 0, 0]
         ↓
      ④ 遍历每张图片：
         - 找出 colHeights 中最小的列
         - 把图片放入该列
         - 更新该列高度
         ↓
      ⑤ 渲染到页面（Vue 自动响应式更新 DOM）
      
      
      ============================================================
      📱 响应式适配
      ============================================================
      
      监听 resize 事件：
        ① 重新计算列数（根据新的容器宽度）
        ② 重置 columns 和 colHeights
        ③ 重新执行分配算法
      
      防抖优化：避免频繁触发 resize 导致的性能问题
      
      
      ============================================================
      ⚡ 性能优势
      ============================================================
      
      ① 没有绝对定位，元素在正常文档流中
      ② 浏览器负责垂直排列，不操作 top/left
      ③ 算法复杂度 O(n)，线性扫描，非常快
      ④ 适合无限滚动加载（只需追加数据，重新分配即可）
    -->

    <div
      v-for="(column, colIndex) in columns"
      :key="colIndex"
      class="waterfall-column"
      :style="{ width: columnWidth + 'px' }"
    >
      <div
        v-for="item in column"
        :key="item.id"
        class="waterfall-item"
        :style="{
          height: item.height + 'px',
          aspectRatio: item.width / item.height,
        }"
      >
        <div class="image-wrapper">
          <img :src="item.image" :alt="item.title" />
        </div>
        <div class="item-title">
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      /**
       * 图片数据源
       * 使用 Lorem Picsum 免费图片库（https://picsum.photos）
       * URL格式：https://picsum.photos/id/{图片ID}/{宽度}/{高度}
       * 特点：通过 ID 可以获取固定图片，方便演示
       */
      list: [],

      /**
       * 列数据（二维数组）
       * columns[0] = [图片1, 图片3, 图片5]  // 第1列的所有卡片
       * columns[1] = [图片2, 图片4, 图片6]  // 第2列的所有卡片
       */
      columns: [],

      columnWidth: 200, // 每列宽度（px），固定值，所有列等宽
      gap: 20, // 间距（px），包括列间距和卡片间距
    };
  },
  mounted() {
    // 1. 生成图片数据
    this.generateImageList();

    // 2. 执行瀑布流布局
    this.initWaterfall();

    // 3. 监听窗口变化重新布局（防抖处理）
    window.addEventListener("resize", this.debounce(this.initWaterfall, 300));
  },
  beforeDestroy() {
    // 移除事件监听，避免内存泄漏
    window.removeEventListener(
      "resize",
      this.debounce(this.initWaterfall, 300),
    );
  },
  methods: {
    /**
     * 生成图片数据（模拟数据源）
     *
     * 为什么要在这里生成 height？
     * 因为在真实的瀑布流中，每张图片的高度决定了它的"占位大小"
     * 而图片的真实高度需要等图片加载完成才能获取
     * 为了简化演示，我们预先随机生成高度，让图片错落有致
     *
     * 生产环境替代方案：
     * ① 后端接口返回图片列表时，直接带上宽高信息
     * ② 使用 Image 对象预加载图片，获取 naturalHeight 后再布局
     * ③ 使用占位图 + 图片加载完成后动态调整
     */
    generateImageList() {
      const total = 30; // 图片总数

      this.list = Array.from({ length: total }, (_, index) => {
        // 图片ID从1循环到20，确保每次刷新看到同样的图片（方便演示）
        const imageId = (index % 20) + 1;

        // 图片宽度 = 列宽度（图片100%撑满列）
        const width = this.columnWidth;

        // 随机生成高度（200~400px），让瀑布流效果更明显
        // ⚠️ 注意：这里是演示用的随机高度
        // 生产环境请替换为后端返回的真实高度！
        /**
         * 生成图片数据（模拟数据源）
         *
         * ============================================================
         * 📌 重要：关于「图片高度从哪来」的完整说明
         * ============================================================
         *
         * 在当前的演示代码中，我们使用 Math.random() 随机生成高度。
         * 但这只是为了「演示瀑布流算法」而做的简化处理！
         *
         * 🚫 为什么真实项目不能用随机数？
         *    1. 布局抖动（CLS）：图片加载前后高度不一致，页面会剧烈跳动
         *    2. 性能灾难：每次刷新都要重新计算，体验极差
         *    3. 不符合工程规范：前端不应负责「测量」图片的物理尺寸
         *
         * ✅ 真实项目的标准做法（前后端协作）：
         *
         *    第一步（后端）：
         *    用户上传图片 → 后端接收文件 → 用图像处理库（如 sharp、ImageIO）
         *    提取图片的 width 和 height → 存入数据库
         *
         *    第二步（后端接口）：
         *    返回列表数据时，除了 imageUrl，同时返回 width 和 height
         *
         *    第三步（前端）：
         *    接收数据 → 根据实际列宽计算展示高度 → 直接用于布局
         *
         * ============================================================
         * 📦 后端返回的数据结构示例
         * ============================================================
         * {
         *   "code": 0,
         *   "data": {
         *     "list": [
         *       {
         *         "id": 1,
         *         "imageUrl": "https://cdn.xxx.com/waterfall/1.jpg",
         *         "title": "风景图",
         *         "width": 800,   // ✅ 真实宽度（后端存）
         *         "height": 1200  // ✅ 真实高度（后端存）
         *       },
         *       {
         *         "id": 2,
         *         "imageUrl": "https://cdn.xxx.com/waterfall/2.jpg",
         *         "title": "人物图",
         *         "width": 800,
         *         "height": 600
         *       }
         *     ]
         *   }
         * }
         *
         * ============================================================
         * 🔧 真实项目的代码写法
         * ============================================================
         *
         * // 请求接口拿到数据后
         * const res = await axios.get('/api/images')
         * this.list = res.data.list.map(item => {
         *   // 根据原图宽高比，计算在当前列宽下的显示高度
         *   const displayWidth = this.columnWidth // 列宽 200px
         *   const displayHeight = (displayWidth / item.width) * item.height
         *
         *   return {
         *     id: item.id,
         *     image: item.imageUrl,
         *     title: item.title,
         *     width: displayWidth,
         *     height: displayHeight, // ✅ 这就是真实的高度！
         *   }
         * })
         *
         * ============================================================
         * 📖 为什么这个设计是「最佳实践」？
         * ============================================================
         *
         * 1. 性能优化：前端无需等待图片加载就能知道高度
         *    → 容器高度固定，完全避免回流和布局抖动（CLS = 0）
         *
         * 2. 用户体验：页面打开即稳定，不会出现"图片撑开"的闪烁
         *
         * 3. 前后端分离：前端只管展示，后端管数据，职责清晰
         *
         * 4. CDN 友好：图片走 CDN，前端只拿数据，互不干扰
         *
         * 记住一句话：
         * 「前端不负责测量图片，前端只负责排列图片」
         * 图片的元数据（宽高、大小、格式）天生就该由后端存储！
         *
         * ============================================================
         * 🎯 那现在这个演示为什么用 Math.random()？
         * ============================================================
         *
         * 因为这是一个「纯前端演示」，没有后端接口支持。
         * 用随机数模拟「高度未知」的场景，只是为了让你理解算法逻辑。
         * 在实际开发中，请务必让后端返回真实高度！
         *
         * 当前演示代码：
         */
        const height = Math.floor(Math.random() * (400 - 200 + 1) + 200);

        return {
          id: index + 1,
          // 使用 picsum 的固定图片ID + 动态尺寸
          image: `https://picsum.photos/id/${imageId}/${width}/${height}`,
          title: `图片 ${index + 1}`,
          width: width, // ✅ 保存宽度，用于 aspect-ratio
          height: height, // ⚠️ 关键：每张图片的高度必须预先知道
        };
      });
    },

    /**
     * 核心布局算法："最短列优先" 贪心策略
     *
     * 算法步骤：
     * ① 计算列数：根据容器宽度和列宽，算出能放几列
     *    colCount = floor((containerWidth + gap) / (columnWidth + gap))
     *    例如：容器 840px，列宽 200px，间距 20px
     *    (840 + 20) / (200 + 20) = 860 / 220 ≈ 3.9 → 取整为 3 列
     *
     * ② 初始化数据结构：
     *    - columns: 二维数组 [[], [], []]，每列存放分配的图片
     *    - colHeights: 一维数组 [0, 0, 0]，记录每列当前总高度
     *
     * ③ 遍历所有图片，执行分配：
     *    - 找出 colHeights 中值最小的列索引（即"最短列"）
     *    - 将当前图片放入该列
     *    - 更新该列高度：colHeights[colIndex] += item.height + gap
     *
     * ④ 渲染结果：
     *    外层 flex 容器，每列宽度固定，列间距用 gap
     *    每列内部垂直排列，卡片间距用 gap
     *
     * 为什么这个算法有效？
     * 每次把图片放到当前最矮的列，能保证所有列的最终高度尽可能接近
     * 这样整个瀑布流底部会相对平整，视觉效果最好
     */
    initWaterfall() {
      // 边界处理：如果容器还没渲染出来，直接返回
      if (!this.$refs.container) return;

      // 1. 计算列数
      const containerWidth = this.$refs.container.clientWidth;
      // 公式：(容器宽度 + 间距) / (列宽 + 间距) 向下取整
      const colCount =
        Math.floor(
          (containerWidth + this.gap) / (this.columnWidth + this.gap),
        ) || 1;

      // 2. 初始化列高度数组（每列当前总高度）
      const colHeights = new Array(colCount).fill(0);

      // 3. 初始化列数组（二维数组，每列存放对应的图片）
      this.columns = Array.from({ length: colCount }, () => []);

      // 4. 遍历所有图片，执行"最短列优先"分配
      this.list.forEach((item) => {
        // 4.1 找到当前总高度最小的列索引
        const minHeight = Math.min(...colHeights);
        const colIndex = colHeights.indexOf(minHeight);

        // 4.2 将图片放入该列
        this.columns[colIndex].push(item);

        // 4.3 更新该列的总高度（图片高度 + 卡片间距）
        colHeights[colIndex] += item.height + this.gap;
      });

      // 此时 this.columns 已经包含了所有图片的正确分配
      // Vue 会自动响应式更新 DOM
    },

    /**
     * 防抖函数
     * 用途：防止用户频繁缩放窗口时，触发大量重复的布局计算
     * 原理：在指定时间内只执行最后一次调用
     *
     * 例如：resize 事件每 100ms 触发一次，防抖延迟 300ms
     * 如果用户连续缩放 500ms，实际只会执行 1~2 次布局计算
     * 大大提升了性能
     */
    debounce(fn, delay) {
      let timer = null;
      return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
      };
    },
  },
};
</script>

<style scoped>
/* 
  CSS 布局方案：Flex 多列布局
  
  为什么不用绝对定位？
  ✅ Flex 方案：浏览器自动处理垂直排列，性能好，代码简单
  ❌ 绝对定位：需要手动计算 top/left，代码复杂，性能差
  
  为什么不用 CSS column-count？
  ❌ column-count：内容垂直截断，顺序错乱，无法精确控制
  ✅ Flex 方案：精确控制每张图片的归属列，顺序正确

  防回流优化说明：
  ① .waterfall-item 设置了固定 height（由 item.height 决定）
  ② 同时设置了 aspect-ratio（由 item.width / item.height 决定）
  ③ 图片使用 height: 100% + object-fit: cover
  ④ 好处：图片加载前后容器尺寸不变，完全避免回流
  ⑤ 图片会按比例裁剪填充，不会变形但可能丢失部分内容
*/

.waterfall-container {
  display: flex; /* 水平排列各列 */
  justify-content: center; /* 居中对齐 */
  gap: 20px; /* 列间距 */
  width: 100%;
}

.waterfall-column {
  display: flex; /* 每列独立垂直排列 */
  flex-direction: column; /* 纵向排列卡片 */
  gap: 20px; /* 卡片间距 */
  /* 宽度由行内样式动态绑定：:style="{ width: columnWidth + 'px' }" */
}

.waterfall-item {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: #f5f5f5; /* 加载时的背景色，避免白屏 */
  /* 
    height 和 aspect-ratio 由行内样式动态绑定：
    :style="{ 
      height: item.height + 'px',
      aspectRatio: item.width / item.height
    }"
  */
}

.image-wrapper {
  flex: 1; /* ✅ 撑满剩余空间 */
  overflow: hidden; /* ✅ 防止图片溢出圆角 */
  background: #f0f0f0;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover; /* ✅ 保持比例裁剪，填满容器 */
  /* 
    object-fit: cover 会裁剪图片以填满容器
    如果不想裁剪，可以改用 object-fit: contain（但会留白）
  */
}

.item-title {
  padding: 10px 12px;
  background: white;
  color: #333;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  flex-shrink: 0; /* ✅ 防止被压缩 */
  border-top: 1px solid #f0f0f0; /* 分割线，让文字更明显 */
}
</style>
