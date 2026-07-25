import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueVirtualScroller from "vue-virtual-scroller";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";

Vue.config.productionTip = false;

// use 要放在 new Vue() 之前
Vue.use(VueVirtualScroller);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
