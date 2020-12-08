import { MessageBox } from "element-ui";
export default {
    install(Vue, options) {
        // 注册全局方法
        Vue.prototype.confirm = (params) => {  // 箭头函数的方法写的    function () {}
            MessageBox.confirm(params.content, params.tip || '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: params.type || 'warning',
                center: true
            }).then(() => {
                params.fn && params.fn(params.id)

                // if(params.fn) { params.fn() } // 普通写法 调用confirmDelete()

                // console.log(params.fn)

                // root.$message({
                //     type: 'success',
                //     message: '删除成功!'
                // });
            }).catch(() => {
                // root.$message({
                //     type: 'info',
                //     message: '已取消删除'
                // });
            });
        }
    }
}


// vue插件