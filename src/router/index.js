// src/router/index.js

import Vue from "vue";
import VueRouter from "vue-router";

// 1. 注册路由插件
Vue.use(VueRouter);

// 2. 定义路由
const routes = [
  {
    path: "/",
    name: "HomePage",
    component: () => import("@/views/homepage/HomePage.vue"), // 首页
  },
  {
    path: "/array-demo",
    name: "ArrayDemo",
    component: () => import("@/views/ArrayDemo.vue"), // 数组课题
  },
  {
    path: "/mixin-demo",
    name: "MixinDemo",
    component: () => import("@/views/MixinDemo.vue"), // Mixin 课题
  },
  {
    path: "/mixin-conflict-demo",
    name: "MixinConflictDemo",
    component: () => import("@/views/MixinsConflictDemo.vue"), // Mixin 冲突 课题
  },
  {
    path: "/extends-demo",
    name: "ExtendsDemo",
    component: () => import("@/views/extends/ChildComponent.vue"), // extends 课题
  },
  {
    path: "/custom-directive-demo",
    name: "CustomDirectiveDemo",
    component: () => import("@/views/customDirectives/CustomDirectiveDemo.vue"), // 自定义指令 课题
  },
  {
    path: "/directive-advanced-demo",
    name: "DirectiveAdvanced",
    component: () => import("@/views/DirectiveAdvenced.vue"), // 自定义指令高级案例
  },
  {
    path: "/single-direction-data-flow",
    name: "SingleDirectionDataFlow",
    component: () =>
      import("@/views/singleDirectionDataFlow/ParentComponent.vue"), // 单向数据流案例
  },
  {
    path: "/dollar-set",
    name: "DollarSet",
    component: () => import("@/views/DollarSet.vue"), // $set
  },
  {
    path: "/v-if-and-v-for",
    name: "VifVfor",
    component: () =>
      import("@/views/notUsingVifVforTogether/notUsingVifVforTogether.vue"), // v-if和v-for不要连用
  },
  {
    path: "/v-for-event-delegation",
    name: "VForEvenDelegation",
    component: () =>
      import("@/views/vForEventDelegation/vForEventDelegation.vue"), // v-for的事件代理
  },
  {
    path: "/mouseover-mouseenter",
    name: "MouseroverMouserenter",
    component: () =>
      import("@/views/mouserOverMouserEnter/MouserOverMouserEnter.vue"), // mouserover冒泡
  },
  {
    path: "/async-component",
    name: "AsyncComponent",
    component: () => import("@/views/asynComponent/AsynComponent.vue"), // 异步组件
  },
  {
    path: "/debounce-throttle",
    name: "Debounce-Throttle",
    component: () => import("@/views/debounceThrottle/DebounceThrottle.vue"), // 防抖节流
  },
  {
    path: "/loadmore",
    name: "Loadmore",
    component: () => import("@/views/LoadMoreDemo.vue"), // 触底加载
  },
  {
    path: "/virtual-list",
    name: "VirtualList",
    component: () => import("@/views/VirtualList.vue"), // 虚拟列表
  },
  {
    path: "/virtual-list-with-load-more",
    name: "VirtualListWithLoadMore",
    component: () => import("@/views/VirtualListWithLoadMore.vue"), // 虚拟列表+触底下载
  },
  {
    path: "/virtual-list-Using-library",
    name: "VirtualListUsingLibrary",
    component: () => import("@/views/VirtualListUsingThirdPartyLibrary.vue"), // 虚拟列表：使用第三方库
  },
  // 后面可以继续添加更多课题
];

// 3. 创建路由实例
const router = new VueRouter({
  mode: "history", // 使用 history 模式，URL 更美观
  base: process.env.BASE_URL,
  routes,
});

export default router;
