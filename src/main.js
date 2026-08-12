import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import VueVirtualScroller from "vue-virtual-scroller";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";

import { installCustomToast } from "@/ultils/customToast/customToast.js";
import "@/ultils/customToast/customToast.css";

// 安装插件（推荐）
installCustomToast(Vue);

Vue.config.productionTip = false;

Vue.use(VueVirtualScroller);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
