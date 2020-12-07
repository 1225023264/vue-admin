import { getUserRole } from "@/api/login";
import { defaultRouterMap, asnycRouterMap } from "@/router";
const state = {
    allRouters: defaultRouterMap,
    addRouters: [],

}

const getters = {
    allRouters: state => state.allRouters,  // 所有的
    addRouters: state => state.addRouters   // 匹配的

}

const mutations = {// 必须的 同步 没有回调处理事情
    SET_ROUTER(state, router){
        state.addRouters = router;
        state.allRouters = defaultRouterMap.concat(router);

        // console.log(state.addRouters);
        // console.log(state.allRouters);
    }
}

const actions = {  // 异步 可以回调处理事情
    /**
     * 获取用户角色
     * @param {*} param0 
     * @param {*} requestData 
     */
    getRoles({ commit }, requestData){
        return new Promise((resolve, reject) => {
            getUserRole().then(response => {
                let role = response.data.data;
                // console.log(response.data.data)
                // commit('SET_ROLES', role);
                // console.log(response.data.data)
                resolve(role);
            })
        })
    },
    /**
     * 创建动态路由
     */
    createRouter({ commit }, data){
        return new Promise((resolve, reject) => {
            // ["userSystem", "infoSystem", __ob__: Observer]
            let role = data;
            // console.log(data)
            // console.log(defaultRouterMap)
            // console.log(asnycRouterMap)
            let addRouters = [];
            if(role.includes('admin')){
                addRouters = asnycRouterMap
            }else{
                addRouters = asnycRouterMap.filter(item => {
                    // console.log(item)
                    // es6 includes
                    // [11,22,33].includes(11)
                    if(role.includes(item.meta.system)){
                        return item;
                    }
                
            })

            }
            
            // 更新路由
            commit('SET_ROUTER', addRouters);
            resolve()
            // console.log(addRouters)
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