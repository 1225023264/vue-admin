import store from "../store/index";

export function buttonPermission(permission){
    // console.log(permission)
    const button = store.getters["app/buttonPermission"];
    const roles = store.getters["app/roles"];   // 获取角色
    // console.log(roles);
    // 如果是超级管理员
    if(roles.includes("admin")) { return true }
    return button.indexOf(permission) != -1; //
}