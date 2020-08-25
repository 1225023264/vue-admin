<template>
    <div>
        子组件
        {{ test }}
        <B v-bind="$attrs" v-on="$listeners" />
    </div>
</template>
<script>
import { reactive } from '@vue/composition-api';
import B from "./b";
export default {
    components: { B },
    setup(props, { attrs }){

        const test = reactive(attrs);

        return {
            test
        }
    }

    // setup(props, content){
    //     // console.log(content)

    //     const test = reactive(content.attrs);

    //     return {
    //         test
    //     }
    // }
}
</script>
<style scoped>

</style>