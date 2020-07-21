import router from "./index";

import { getToken } from "@/utils/app";

const whiteRouter = ['/login'];     // indexOf方法, 判断数组中是否存在指定的某个对象,   如果不存在, 则返回-1

// 路由守卫
router.beforeEach((to, form, next) => {
    // console.log(to)     // index
    if (getToken()) {
        next();
        /**
         * 1、 to = /console
         * 2、 to = /index
         */
        // 路由的动态添加,分配菜单,每个角色分配不同的菜单
        console.log('存在');
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
    // console.log(form)   // 离开之前的页面 （上一个）
    // console.log(next)
    // next()     
  })
  