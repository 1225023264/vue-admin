import router from "./index";
import store from "../store/index";

import { getToken, removeToKen, removeUserName } from "@/utils/app";

const whiteRouter = ['/login'];     // indexOf方法, 判断数组中是否存在指定的某个对象,   如果不存在, 则返回-1

// 路由守卫
router.beforeEach((to, from, next) => {
    // console.log(to)     // index
    if (getToken()) {
        // console.log(to)
        if (to.path === '/login') {
            removeToKen();
            removeUserName();
            store.commit("app/SET_TOKEN",'');
            store.commit("app/SET_USERNAME",'');
            next();
        } else {
            // 获取用户角色
            // 动态分配路由权限
            /**
             * 1、什么时候处理动态路由
             * 2、以什么条件处理
             * roles[]
             */
            if(store.getters['app/roles'].length === 0){
                // console.log()
                store.dispatch('permission/getRoles').then(response => {

                    let role = response.role;
                    // console.log(role)
                    store.commit('app/SET_ROLES', role);
                    // console.log(response)
                    store.dispatch('permission/createRouter', role).then(response => {
                        let addRouters = store.getters['permission/addRouters'];
                        let allRouters = store.getters['permission/allRouters'];
                        // 路由更新
                        router.options.routes = allRouters;
                        // 添加动态路由 router.addRoutes(routes: Array<RouteConfig>)
                        router.addRoutes(addRouters);
                        next({ ...to, replace: true});
                        // es6扩展运算符，防止内容发生变化的情况
                        // replace 不被记录历史记录
                    })
                });
            }else{
                next();
            }

             
            // next();
        }

        /**
         * 1、 to = /console
         * 2、 to = /index
         */
        // 路由的动态添加,分配菜单,每个角色分配不同的菜单
        // console.log('存在');
    }else{
        // next('/login')   // 路由指向
        if (whiteRouter.indexOf(to.path) !== -1 ) {     // 存在
            next();     // to
        }else{
            next('/login')      // 路由指向
        }
        /**
         * 1、 直接进入index的时候,参数to被变成了 "/index",触发路由指向，就会跑beforeEach
         * 2、 再一次 next 指向了login, 再次发生路由指向,再跑beforeEach,参数的to被改变成了 "/login"
         * 3、 白名单判断存在,则直接执行next(),因为没有参数,所以不会再次beforeEach.
         */
    }
    // console.log(to)   // 进入的页面 （下一个页面）
    // console.log(from)   // 离开之前的页面 （上一个）
    // console.log(next)
    // next()     
  })
  