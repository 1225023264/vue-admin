import Vue from "vue";
import Vuex from "vuex";
import Cookie from "cookie_js";
Vue.use(Vuex);

import app from "./modules/app";
import login from "./modules/login";

export default new Vuex.Store({
  modules: {
    app,
    login
  }
  
});