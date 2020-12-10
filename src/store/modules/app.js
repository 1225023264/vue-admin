import { Login, Logout } from "@/api/login";
import { setToKen, removeToKen, removeUserName, setUserName , getUserName } from "@/utils/app";
const state = {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
    // isCollapse: localStorage.getItem('isCollapse') || false
    // isCollapse: JSON.parse(Cookie.get('isCollapse')) || false

    to_Ken: '',
    username: getUserName() || '',
    roles: [],
    buttonPermission:[],

}

const getters = {
    isCollapse: state => state.isCollapse,
    roles: state => state.roles,
    buttonPermission: state => state.buttonPermission
}

const mutations = {// 必须的 同步 没有回调处理事情
    SET_COLLAPSE(state) {
        state.isCollapse = !state.isCollapse;
        //  Html5 本地储存
        sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));
        // localStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))    
        // Cookie.set('isCollapse', JSON.stringify(state.isCollapse));
    },
    SET_TOKEN(state,value){
        state.to_Ken = value
    },
    SET_USERNAME(state,value){
        state.username = value
    },
    SET_ROLES(state, value){
        state.roles = value;
        // console.log(state.roles.role);
    },
    SET_BUTTON(state, value){
        state.buttonPermission = value;
        // console.log(state.buttonPermission);
    }

}
const actions = {  // 异步 可以回调处理事情
    login({ commit }, repuestData) {
        return new Promise((resolve, reject) => {
            // 接口
            Login(repuestData).then((response) => {
                // console.log(response)
                let data = response.data.data
                // console.log(content);
                // 普通的方式
                // content.commit('SET_TOKEN', data.toKen);
                // content.commit('SET_USERNAME', data.username);
                // 解构的
                commit('SET_TOKEN', data.token);
                commit('SET_USERNAME', data.username);
                setToKen(data.token);
                setUserName(data.username);
                // token 、username
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    logout({ commit }){
        return new Promise((resolve, reject) => {
            Logout().then(response => {
                const data = response.data;
                removeToKen();
                removeUserName();
                commit('SET_TOKEN', '');
                commit('SET_USERNAME', '');
                commit('SET_ROLES', []);
                resolve(data);
            })
        })
    }

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};