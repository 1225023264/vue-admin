import Vue from "vue";
// import Vue from "vue/dist/vue.runtime.common.js";
import VueCompositionApi from "@vue/composition-api"; 
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/index.js";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./router/premit";

// 自定义全局方法
// import global from "@/utils/global.js";

// 自定义全局组件
import "./icons";
// 全局方法引入按钮权限
import { buttonPermission} from "./utils/buttonPermission";
Vue.prototype.btnPerm = buttonPermission;
// 自定义指令按钮权限
import "./utils/buttonPerm";

// Vue.use(global);
Vue.use(ElementUI);
Vue.use(VueCompositionApi);

Vue.config.productionTip = false;

// runtime模式（运行时）
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");