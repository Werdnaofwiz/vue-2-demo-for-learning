<template>
  <div class="container">
    <!-- 例子 -->
    <LayerExamples />
    <!-- 笔记 -->
    <LayerNotes />
  </div>
</template>

<script>
import LayerExamples from "./modules/LayerExamples.vue";
import LayerNotes from "./modules/LayerNotes.vue";

export default {
  name: "CompostingLayerHack",
  components: {
    LayerNotes,
    LayerExamples,
  },
};
</script>

<style>
.container {
  max-width: 1100px;
  margin: 0 auto;
}
</style>
