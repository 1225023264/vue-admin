import service from "@/utils/request";
/**
 * 列表
 */
export function GetRole(data = {}) {        // es6写法可以直接定义默认参数 data = {}, aaa = 111 
    return service.request({
        method: "post",
        url: "/role/",
        data
    })
}



/**
 * 列表
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
