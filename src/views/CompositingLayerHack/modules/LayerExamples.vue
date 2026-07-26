<template>
  <div class="demo">
    <!--
      ============================================================
      示例1：rotateX(10deg) — 自然触发分层
      ============================================================
      【F12 查看方法】
      1. 打开 Chrome DevTools（F12）
      2. 按 Cmd+Shift+P / Ctrl+Shift+P，输入 "Layers"，选择 "Show Layers"
      3. 在左侧图层列表中，找到这个元素对应的图层
      4. 点击后，右侧 Details 面板会显示：
         - Compositing Reasons: "transform 3d" 或 "3D transform"
         - Memory estimate: 约几百 KB

      【为什么要分层】
      这是真正的 3D 变换，浏览器必须启用 GPU 来处理 3D 透视投影。
      分层是"不得不做"的事情，不是 hack。

      【特点】
      - 有实际视觉效果（元素在 3D 空间倾斜了 10 度）
      - 分层是浏览器为了正确渲染 3D 场景而自动做的
      - 属于"被动接受"型，不是刻意优化
      ============================================================
    -->
    <div style="transform: rotateX(30deg)">① rotateX(30deg) — 自然触发分层</div>

    <!--
      ============================================================
      示例2：will-change: transform — 推荐做法
      ============================================================
      【F12 查看方法】
      1. 打开 Layers 面板（同上）
      2. 可以看到这个元素也在图层列表中
      3. 点击后，Compositing Reasons 显示: "will-change: transform"
      4. 打开 Randering 面板：点击点击最右边的 >>（三个点，更多选项卡）
         在下拉菜单中找到 "Rendering" 并点击。这时 DevTools 底部或右侧会出现 
         Rendering 面板，里面有各种勾选项。勾选 "Paint flashing"
      4. Hover 时观察 Rendering 面板的 "Paint flashing"：
         - Hover 时不会出现绿色闪烁 → 说明跳过了 Paint
         - 证明这是真正的零开销动画

      【为什么要分层】
      主动告诉浏览器："这个元素即将发生 transform 变化，请提前准备层。"
      避免动画开始时因临时创建层而产生卡顿。

      【推荐理由】
      - 语义明确（不是 hack，是标准属性）
      - 按需创建（浏览器可以智能决定何时创建、何时回收）
      - 配合 transform/opacity 动画，真正跳过 Layout + Paint

      【适用场景】
      高频、持续的 transform/opacity 动画（如 60fps 过渡）

      【备注】
      如果删除style中的will-change: transform，再去调试，可以发现产生开销了
      ============================================================
    -->
    <div
      style="
        will-change: transform;
        transition: transform 0.3s;
        cursor: pointer;
      "
      @mouseenter="$event.target.style.transform = 'scale(1.05)'"
      @mouseleave="$event.target.style.transform = 'scale(1)'"
    >
      ② will-change: transform — 推荐
    </div>

    <!--
      ============================================================
      示例3：translateZ(0) + margin-left 动画 — 不推荐（反模式）
      ============================================================
      【F12 查看方法】
      1. 打开 Layers 面板（同上）
      2. 这个元素也在图层列表中（因为 translateZ(0) 强制触发了分层）
      3. Compositing Reasons 显示: "3D transform"（和示例1一样）
      4. 但关键区别在于打开 Rendering → "Paint flashing"：
         - Hover 触发 margin-left 动画时 → 出现大量绿色闪烁！
         - 说明虽然有了合成层，但 margin-left 变化仍然触发了 Paint
         - 分层对它毫无帮助

      【为什么是不推荐的反模式】
      1. translateZ(0) 是纯 hack（视觉上没有任何变化）
      2. margin-left 变化会触发布局（Layout）→ 绘制（Paint）
      3. 即使元素在合成层上，Layout 和 Paint 依然会发生
      4. 分层无法跳过这两个阶段，所以白白消耗 GPU 内存

      【对比示例2】
      - 示例2：will-change + transform → 分层真正生效，跳过 Paint ✅
      - 示例3：translateZ(0) + margin-left → 分层无效，浪费内存 ❌

      【正确的做法】
      如果要做 margin 动画，应该用 transform: translateX() 替代，
      然后再配合 will-change: transform 进行优化。
      ============================================================
    -->
    <div
      style="
        transform: translateZ(0);
        transition: margin-left 1s;
        cursor: pointer;
      "
      @mouseenter="$event.target.style.marginLeft = '50px'"
      @mouseleave="$event.target.style.marginLeft = '0'"
    >
      ③ translateZ(0) + margin-left 动画 — 不推荐
    </div>
  </div>
</template>

<script>
export default {
  name: "LayerDemo",
};
</script>

<style scoped>
.demo > div {
  background: #e2e8f0;
  padding: 8px;
  margin: 4px 0;
  text-align: center;
}
</style>
