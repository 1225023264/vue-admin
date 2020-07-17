import Vue from "vue";

// import Vue from "vue/dist/vue.runtime.common.js";

import VueCompositionApi from '@vue/composition-api'; 
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 自定义全局组件
import "./icons";

Vue.use(ElementUI);
Vue.use(VueCompositionApi);
Vue.config.productionTip = false;

// runtime模式（运行时）
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");