<template>
  <div id="nav-wrap">
    <h1 class="logo"><img src="../../../assets/logo.png" alt=""></h1>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      router
    >
      <template v-for="(item, index) in routers">
        <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
          <!-- 一级菜单-->
          <template slot="title">
            <svg-icon :iconClass="item.meta.icon" :class="item.meta.icon" />
            <span slot="title">{{ item.meta.name }}</span>
          </template>
          <!-- 子级菜单-->
          <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.id"
            :index="subItem.path"
          >{{ subItem.meta.name }}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { reactive, ref, isRef, toRefs, onMounted } from "@vue/composition-api";
export default {
  name: "navMenu",
  setup(props, { root }) {
    /**
     *  data 数据
     */
    const isCollapse = ref(false);
    const routers = reactive(root.$router.options.routes);
    /**
     *  函数
     */
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    return {
      isCollapse,
      routers,
      handleOpen,
      handleClose
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
.logo{
  text-align: center;
  img{
    margin: 28px auto 5px;
    width: 92px;
  }
}
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenu;
  height: 100vh;
  background-color: #344a5f;
  svg {
    font-size: 20px;
    margin-right: 10px;
    
  }
}
</style>