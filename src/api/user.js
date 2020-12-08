import service from "@/utils/request";
/**
 * 角色列表
 */
export function GetRole(data = {}) {        // es6写法可以直接定义默认参数 data = {}, aaa = 111 
    return service.request({
        method: "post",
        url: "/role/",
        data
    })
}

/**
 * 系统列表
 */
export function GetPermButton(data = {}) {        // es6写法可以直接定义默认参数 data = {}, aaa = 111 
    return service.request({
        method: "post",
        url: "/permButton/",
        data
    })
}

/**
 * 系统列表
 */
export function GetSystem(data = {}) {        // es6写法可以直接定义默认参数 data = {}, aaa = 111 
    return service.request({
        method: "post",
        url: "/system/",
        data
    })
}



/**
 * 添加用户
 */
export function UserAdd(data = {}) {        // es6写法可以直接定义默认参数 data = {}, aaa = 111 
    return service.request({
        method: "post",
        url: "/user/add/",
        data
    })
}




/**
 * 删除用户
 */
export function UserDel(data) {        // es6写法可以直接定义默认参数 data = {}, aaa = 111 
    return service.request({
        method: "post",
        url: "/user/delete/",
        data
    })
}



/**
 * 用户禁启用
 * @param {
    * 
    * } data 
    */
   export function UserActives(data) {        // es6写法可以直接定义默认参数 data = {}, aaa = 111 
       return service.request({
           method: "post",
           url: "/user/actives/",
           data
       })
   }

   /**
    * 用户编辑
    * @param {
    * 
    * } data 
    */
   export function UserEdit(data) {        // es6写法可以直接定义默认参数 data = {}, aaa = 111 
       return service.request({
           method: "post",
           url: "/user/edit/",
           data
       })
   }
