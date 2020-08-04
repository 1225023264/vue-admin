<template></template>
<script>
import { reactive, ref, watch, onMounted } from "@vue/composition-api";
export default {
  name: "infoDetailed",
  setup(props, { root }) {
      /**
       * 这里的代码又执行了一次
       */
    let id = root.$route.params.id || root.$store.getters["infoDetailed/infoId"];
    let title = root.$route.params.title || root.$store.getters["infoDetailed/infoTitle"];


    console.log("id:" + id)
    console.log("title:" + title)
  }
};
</script>
<style scoped>
</style>