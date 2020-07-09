import request from "@/utils/request"
import service from "../utils/request"
/**
 * 获取验证码
 */
export function GetSms(data) {
    return request.request({
        method:"post",
        url:"/getSms/",
        data:data
        // data: data,左边的data是变量名(key)后台接收的。右边的Data是接收的参数。 如果两者都是同名的情况下，可以单独写成一个即可（ES6的写法)
        
    })
    
}
 
/**
 * 获取用户角色
 */
 
/**
 * 登录
 */
 
/**
 * 注册
 */
export function Register(data) {
    return service.request({
        method:"post",
        url: "/register/",
        data
    })
}