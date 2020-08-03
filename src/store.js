import Vue from "vue";
import Vuex from "vuex";
import { Login } from "@/api/login"
import Cookie from "cookie_js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false
    // isCollapse: localStorage.getItem('isCollapse') || false
    // isCollapse: JSON.parse(Cookie.get('isCollapse')) || false

  },
  getters: {
    isCollapse: state => state.isCollapse
  },
  mutations: { // 必须的 同步 没有回调处理事情
    SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse;
      //  Html5 本地储存
      sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));
      // localStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))    
      // Cookie.set('isCollapse', JSON.stringify(state.isCollapse));
    }
  },
  actions: {   // 异步 可以回调处理事情
    login(content, repuestData){
      return new Promise((resolve, reject) => {
        // 接口
        Login(repuestData).then((response) => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
});
