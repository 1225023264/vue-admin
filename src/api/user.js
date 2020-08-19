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
