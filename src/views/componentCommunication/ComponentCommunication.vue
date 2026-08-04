<template>
  <div class="outer-container">
    <h2>组件通信</h2>
    <hr />
    <!-- props和emit -->
    <PropsEmit />
    <hr />
    <!-- 事件总线 -->
    <EventBus />
    <hr />
    <!-- provide/inject -->
    <ProvideInject />
    <hr />
    <!-- 使用$ref -->
    <DollarRef />
    <hr />
    <!-- 使用$attrs和$listeners -->
    <DollarAttrsDollarListeners />
    <hr />
    <!-- 使用$child -->
    <DollarChild />
  </div>
</template>
<script>
import PropsEmit from "@/views/componentCommunication/PropsEmit/ParentComponent.vue";
import EventBus from "@/views/componentCommunication/EventBus/ParentComponent.vue";
import ProvideInject from "@/views/componentCommunication/ProvideInject/ParentComponent.vue";
import DollarRef from "@/views/componentCommunication/DollarRef/ParentComponent.vue";
import DollarAttrsDollarListeners from "@/views/componentCommunication/DollarAttrsDollarListeners/ParentComponent.vue";
import DollarChild from "@/views/componentCommunication/DollarChild/ParentComponent.vue";

export default {
  components: {
    PropsEmit,
    EventBus,
    ProvideInject,
    DollarRef,
    DollarAttrsDollarListeners,
    DollarChild,
  },
};
</script>

<style scoped>
.outer-container ::v-deep h3 {
  margin-top: 0;
}
</style>
