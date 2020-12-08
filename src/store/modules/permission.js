import { getUserRole } from "@/api/login";
import { defaultRouterMap, asnycRouterMap } from "@/router";

function hasPremission(roles, router){
    if(router.meta && router.meta.role){
        return roles.some(item => router.meta.role.indexOf(item) >= 0) 
    }


    // indexOf 对大小写敏感
    // let str = 'aaa Abc';
    
    // str.indexOf('aaa')  // 0
    // str.indexOf('abc')  // -1
    // str.indexOf('Abc')  // 4


    // console.log(roles)
    // console.log(router.meta.role)
    
    // [11,22,33].includes('11') 处理一维数组，二维数组就无法处理了
    // [11,22,33].some(item => item = 22 )
    // 用户角色：["technician", "sale", "manager"]
    // 路由配置：["sale"]

}
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
                // console.log(response.data.data.role)
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
        // console.log(data)
        return new Promise((resolve, reject) => {
            // ["userSystem", "infoSystem", __ob__: Observer]
            let role = data;
            // console.log(data)
            // console.log(defaultRouterMap)
            // console.log(asnycRouterMap)
            // 超管的状态
            let addRouters = [];
            if(role.includes('admin')){
                addRouters = asnycRouterMap
            }else{  //普通管理员
                addRouters = asnycRouterMap.filter(item => {
                    if(hasPremission(role, item)){
                        // 优先判断
                        if(item.children && item.children.length > 0) {
                            item.children = item.children.filter(child => {
                                if(hasPremission(role, child)){
                                    return child;
                                }
                            })
                            return item;
                        }
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
    actions,
}