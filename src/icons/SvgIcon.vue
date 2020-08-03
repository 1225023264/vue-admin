<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script>
import { ref, computed, onMounted } from "@vue/composition-api";
export default {
  name: "svgIcon",
  //   props: ['iconClass','className'], 简单写法  不限制数据类型
  props: {
    //    分页
    iconClass: {
      type: String, // 定义接收的值的类型
      default: ""
    },
    className: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    // console.log(props.iconClass);
    // console.log(props.className);
    const msg = ref("认真学习前端代码");
    const number = ref(1);

    // 计算属性、得出最终结果，并返回
    const iconName = computed(() => `#icon-${props.iconClass}`);

    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`;
      } else {
        return `svg-icon`;
      }
    });
    /**
     * computed 监听属性变化，并计算属性
     * // 计算余额总额
     */
    // const plusOne = computed({
    //   get: () => number.value + 1,
    //   set: val => {number.value = val - 1}
    // });

    // const aaaa = () => {
    //   plusOne.value = 5;
    // };

    return {
      msg,
      iconName,
      svgClass
      // plusOne,
      // aaaa
    };
  }
};
</script>
<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style>