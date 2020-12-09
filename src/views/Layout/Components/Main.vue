<template>
  <div id="main-wrap">
    <div class="main-context">
      <div class="context">
        <!-- 子路由显示区 -->   
        <!--  include只缓存名称匹配的组件 exclude不缓存名称匹配的组件 max 数字最多缓存多少组件实例 -->
        <keep-alive exclude="infoIndex">
          <!-- 需要缓存 -->
          <router-view v-if="$route.meta.keepAlive"/>
        </keep-alive>
        <!-- 不需要缓存 -->
        <router-view v-if="!$route.meta.keepAlive"/>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, reactive } from "@vue/composition-api";
export default {
  name: "layoutMain",
  setup(props ,{root}) {
  

  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#main-wrap {
  height: 100vh;
  //   position: fixed;
  //   left: $navMenu;
  //   top: 75px;
  //   right: 0;
  //   bottom: 0;
  //   border: 30px solid #f7f7f7;
  //   border-bottom: none;
  //   -webkit-box-sizing: border;
}
.main-context {
  width: 100%;
  height: 100%;
  padding-top: $layoutHeader + 30;
  padding-right: 30px;
  box-sizing: border-box;
  @include webkit(transition, border-box);
  @include webkit(transition, all 0.3s ease 0s);
}
.open {
  .main-context {
    padding-left: $navMenu + 30;
  }
}
.close {
  .main-context {
    padding-left: $navMenuMin + 30;
  }
}
.context {
  width: 100%;
  height: 100%;
  padding: 30px 30px 0 30px;
  background-color: #fff;
  @include webkit(box-sizing, border-box);
}
</style>