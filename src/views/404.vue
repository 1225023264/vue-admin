<template>
    <div class="page404">
        <div>这是404页面</div>
    </div>
</template>

<script>
export default {
    name: 'Page404',
    computed:{
        message() {
            return 'The webmaster said that you can not enter this page...'
        }
    }
}
</script>

<style lang="scss" scoped>
.page404 {
    text-align: center;
    display: flex;
    align-items: center;
    text-align: center;
}
</style>