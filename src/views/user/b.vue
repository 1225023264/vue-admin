<template>
    <div>
        孙组件
        {{ testB }}
        <el-button @click="backcall">调用index.vue的方法</el-button>
    </div>
</template>
<script>
import { reactive, inject } from '@vue/composition-api';
export default {
    props: {
        bbb: {
            type: String,
            default: ""
        }
    },
    setup(props, { emit, attrs }){
        
        // 接收
        const aaa = inject("aaaaaaa");
        console.log(aaa)

        const testB = reactive(attrs);

        const backcall = () => {
            emit("upaa")
        }

        return {
            testB,
            backcall
        }
    }

    
}
</script>
<style scoped>

</style>