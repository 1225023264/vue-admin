import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

/**
 * 1、系统分配
 * 2、角色分配
 */

 /**
  * 
  * 1、默认路由
  * 2、动态路由
  * 
  */

// 引入布局组件     文件下的index文件会默认自动读取，如果文件下没有会报错
import Layout from '@/views/Layout'

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

/**
 * 默认路由
 */
export const defaultRouterMap = [
  {
    path: "/",
    redirect: "login",
    hidden: true,
    meta: {
      name: "主页"
    },
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    meta: {
      name: "登录"
    },
    component: () => import("../views/Login/index.vue")
  },
  {
    path: "/console",
    name: "Console",
    redirect: "index",
    meta: {
      name: "控制台",
      icon: 'console'
    },
    component: Layout,
    children: [
      {
        path: "/index",
        name: "Index",
        meta: {
          name: "首页"
        },
        component: () => import("../views/Console/index.vue")
      }
    ]
  },
  // 404 页面
  {
    path: "/page404",
    meta: {
      name: "404",
      icon: '404'
    },
    hidden: true,
    component: Layout,
    children: [
      {
        path: "/404",
        meta: {
          name: "404"
        },
        component: () => import("../views/404.vue")
      }
    ]
  }
]


export default new Router({
  routes: defaultRouterMap

});


/**
 * 动态路由
 * 角色： sale, manager, technician
 */
export const asnycRouterMap = [

  /**
   * 信息管理
   */
  {
    path: "/info",
    name: "Info",
    meta: {
      role:['sale', 'manager', 'technician'],
      system: 'infoSystem', // 自定义key
      name: "信息管理",
      icon: 'info'
    },
    component: Layout,
    children: [
      {
        path: "/infoIndex",
        name: "InfoIndex",
        meta: {
          keepAlive: true,
          role:['sale', 'manager'],
          name: "信息列表"
        },
        component: () => import("../views/Info/index.vue")
      },
      {
        path: "/infoCategory",
        name: "InfoCategory",
        meta: {
          keepAlive: true,
          role:['sale', 'manager'],
          name: "信息分类"
        },
        component: () => import("../views/Info/category.vue")
      },
      {
        path: "/infoDetailed",
        name: "InfoDetailed",
        hidden: true,
        meta: {
          keepAlive: true,
          role:['sale', 'manager'],
          name: "信息详情"
        },
        component: () => import("../views/Info/detailed.vue")
      }
    ]
  },
  /**
   * 用户管理
   */
  {
    path: "/user",
    name: "User",
    meta: {
      role:['sale', 'manager'],
      system: 'userSystem',
      name: "用户管理",
      icon: 'user'
    },
    component: Layout,
    children: [
      {
        path: "/userIndex",
        name: "UserIndex",
        meta: {
          keepAlive: true,
          role:['sale', 'manager'],
          name: "用户列表"
        },
        component: () => import("../views/User/index.vue")
      }
    ]
  },
  { path: "*", redirect: "/404", hidden: true }
]


// const routes = [
//   {
//     path: "/",
//     redirect: "login"
//   },
//   {
//     path: "/login",
//     name: "Login",
//     component: () => import("../views/Login/index.vue")
//   }
// ];

// const router = new VueRouter({
//   routes
// });

// export default router;