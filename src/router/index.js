// src/router/index.js

import Vue from "vue";
import VueRouter from "vue-router";

// 1. 注册路由插件
Vue.use(VueRouter);

// 2. 定义路由
const routes = [
  // 首页
  {
    path: "/",
    name: "HomePage",
    component: () => import("@/views/homepage/HomePage.vue"),
  },
  // 数组响应式
  {
    path: "/array-demo",
    name: "ArrayDemo",
    component: () => import("@/views/ArrayDemo.vue"),
    meta: {
      title: "数组响应式",
      description: "学习 Vue 2 数组的 7 个变异方法",
    },
  },
  // Mixin
  {
    path: "/mixin-demo",
    name: "MixinDemo",
    component: () => import("@/views/MixinDemo.vue"),
    meta: {
      title: "Mixin",
      description: "学习 Vue 2 中的 Mixin 特性",
    },
  },
  // 展示Mixin的冲突
  {
    path: "/mixin-conflict-demo",
    name: "MixinConflictDemo",
    component: () => import("@/views/MixinsConflictDemo.vue"),
    meta: {
      title: "展示Mixin的冲突",
      description: "展示 Vue 2 中的 Mixin 的冲突特性",
    },
  },
  // extends
  {
    path: "/extends-demo",
    name: "ExtendsDemo",
    component: () => import("@/views/extends/ChildComponent.vue"),
    meta: {
      title: "extends",
      description: "学习 Vue 2 中的 extends 特性",
    },
  },
  // 自定义指令
  {
    path: "/custom-directive-demo",
    name: "CustomDirectiveDemo",
    component: () => import("@/views/customDirectives/CustomDirectiveDemo.vue"),
    meta: {
      title: "自定义指令",
      description: "学习 Vue 2 中的自定义指令",
    },
  },
  // 自定义指令高级案例
  {
    path: "/directive-advanced-demo",
    name: "DirectiveAdvanced",
    component: () => import("@/views/DirectiveAdvenced.vue"),
    meta: {
      title: "自定义指令高级案例",
      description: "学习 Vue 2 中的自定义指令高级用法",
    },
  },
  // 单向数据流案例
  {
    path: "/single-direction-data-flow",
    name: "SingleDirectionDataFlow",
    component: () =>
      import("@/views/singleDirectionDataFlow/ParentComponent.vue"),
    meta: {
      title: "单向数据流",
      description: "学习 Vue 2 中的单向数据流概念",
    },
  },
  // $set
  {
    path: "/dollar-set",
    name: "DollarSet",
    component: () => import("@/views/DollarSet.vue"),
    meta: {
      title: "$set案例展示",
      description: "学习 Vue 2 中的$set用法",
    },
  },
  // v-if和v-for不要连用
  {
    path: "/v-if-and-v-for",
    name: "VifVfor",
    component: () =>
      import("@/views/notUsingVifVforTogether/notUsingVifVforTogether.vue"),
    meta: {
      title: "v-if v-for不要连用",
      description: "性能优化1",
    },
  },
  // v-for的事件代理
  {
    path: "/v-for-event-delegation",
    name: "VForEvenDelegation",
    component: () =>
      import("@/views/vForEventDelegation/vForEventDelegation.vue"),
    meta: {
      title: "v-for事件代理优化",
      description: "性能优化2",
    },
  },
  // mouserover冒泡机制
  {
    path: "/mouseover-mouseenter",
    name: "MouseroverMouserenter",
    component: () =>
      import("@/views/mouserOverMouserEnter/MouserOverMouserEnter.vue"),
    meta: {
      title: "mouserover冒泡机制",
      description: "性能优化2知识补充",
    },
  },
  // 异步组件
  {
    path: "/async-component",
    name: "AsyncComponent",
    component: () => import("@/views/asynComponent/AsynComponent.vue"),
    meta: {
      title: "异步组件",
      description: "性能优化3",
    },
  },
  // 防抖节流
  {
    path: "/debounce-throttle",
    name: "Debounce-Throttle",
    component: () => import("@/views/debounceThrottle/DebounceThrottle.vue"),
    meta: {
      title: "防抖节流",
      description: "性能优化4",
    },
  },
  // 触底加载
  {
    path: "/loadmore",
    name: "Loadmore",
    component: () => import("@/views/LoadMoreDemo.vue"),
    meta: {
      title: "触底加载",
      description: "性能优化5",
    },
  },
  // 虚拟列表
  {
    path: "/virtual-list",
    name: "VirtualList",
    component: () => import("@/views/VirtualList.vue"),
    meta: {
      title: "虚拟列表",
      description: "性能优化6",
    },
  },
  // 虚拟列表+触底下载
  {
    path: "/virtual-list-with-load-more",
    name: "VirtualListWithLoadMore",
    component: () => import("@/views/VirtualListWithLoadMore.vue"),
    meta: {
      title: "虚拟列表+触底下载",
      description: "性能优化7",
    },
  },
  // 虚拟列表：使用第三方库
  {
    path: "/virtual-list-Using-library",
    name: "VirtualListUsingLibrary",
    component: () => import("@/views/VirtualListUsingThirdPartyLibrary.vue"),
    meta: {
      title: "虚拟列表：使用第三方库",
      description: "性能优化8",
    },
  },
  // 渲染分层hack
  {
    path: "/compositing-layer-hack",
    name: "CompositingLayerHack",
    component: () =>
      import("@/views/compositingLayerHack/CompostingLayerHack.vue"),
    meta: {
      title: "渲染分层hack",
      description: "性能优化9",
    },
  },
  // 利用vue.extend实现自定义toast
  {
    path: "/custom-toast-demo",
    name: "CustomToastDemo",
    component: () => import("@/views/customToast/CustomToastDemo.vue"),
    meta: {
      title: "vue.extend自定义toast",
      description: "UI组件库$toast效果的函数式实现",
    },
  },
  // beforeCreate钩子能干什么
  {
    path: "/before-create",
    name: "BeforeCreate",
    component: () => import("@/views/beforeCreate/beforeCreate.vue"),
    meta: {
      title: "beforeCreate钩子能干什么",
      description: "声明周期钩子函数1",
    },
  },
  // 组件通信
  {
    path: "/component-communication",
    name: "ComponentCommunication",
    component: () =>
      import("@/views/componentCommunication/ComponentCommunication.vue"),
    meta: {
      title: "组件通信",
      description: "常用组件通信方式复习",
    },
  },
  // 瀑布流（手动实现）
  {
    path: "/waterfall",
    name: "Waterfall",
    component: () => import("@/views/WaterfallDemo.vue"),
    meta: {
      title: "瀑布流（手动实现）",
      description: "贪心算法手写实现多列flex瀑布流",
    },
  },
  // vuex基本展示
  {
    path: "/vuex",
    name: "Vuex",
    component: () => import("@/views/VuexDemo.vue"),
    meta: {
      title: "vuex基本展示",
      description: "vuex的一个小范例",
    },
  },
  // 作用域插槽
  {
    path: "/scope-slot",
    name: "ScopeSlot",
    component: () => import("@/views/scopeSlot/ParentComponent.vue"),
    meta: {
      title: "作用域插槽应用",
      description: "典型应用，组件库的table组件",
    },
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
