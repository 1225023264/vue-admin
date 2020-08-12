<template>
  <el-table :data="data.tableData" border style="width: 100%">
    <!-- 多选框 -->
    <el-table-column v-if="data.tableConfig.selection" type="selection" width="55"></el-table-column>

    <!-- 文本数据渲染 -->
    <template v-for="item in data.tableConfig.tHead">
      <!-- v-slot -->
      <el-table-column :key="item.field" :prop="item.field" :label="item.label" :width="item.width" v-if="item.columnType === 'slot'">
        <template slot-scope="scope">
          <slot :name="item.slotName" :data="scope.row"></slot>
        </template>
      </el-table-column>
      <!-- function -->
      <el-table-column :key="item.field" :prop="item.field" :label="item.label" :width="item.width" v-else-if="item.columnType === 'function'"></el-table-column>
      <!-- 文本数据渲染 -->
      <el-table-column :key="item.field" :prop="item.field" :label="item.label" :width="item.width" v-else></el-table-column>
    </template>
  </el-table>
</template>
<script>
import { reactive, onBeforeMount } from "@vue/composition-api";
export default {
  name: "tableVue",
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { root }) {
    // console.log(props.config);
    const data = reactive({
      tableConfig: {
        selection: true,
        recordCheckbox: false,
        tHead: []
      },
      tableData: [
        {
          email: "2016-05-02",
          name: "王小虎",
          phone: 13512345678,
          address: "上海市普陀区金沙江路 1518 弄",
          role: "超管"
        },
        {
          email: "2016-05-04",
          name: "王小虎",
          phone: 13585207410,
          address: "上海市普陀区金沙江路 1517 弄",
          role: "超管"
        }
      ]
    });

    /**
     * 方法 methods
     */
    // 初始化table配置项
    const initTableConfig = () => {
      let configData = props.config;
      for (let key in configData) {
        // console.log(key);
        // console.log(configData[key]);
        if (data.tableConfig[key]) {
          data.tableConfig[key] = configData[key];
        }
        // data.tableConfig[key] == data.tableConfig.tHead
        // data.tableConfig[key] == data.tableConfig.selection
      }
      //   console.log(props.config);
      //   data.tableConfig.tHead = props.config.tHead;
      //   data.tableConfig.selection = props.config.selection;
    };

    onBeforeMount(() => {
      initTableConfig();
    });

    return {
      data
    };
  }
};
</script>
<style lang="scss" scoped>
</style>

<!--
初始化的数据，不需要监听，
可以在挂载之前预先处理。
-->



<!--
v-slot 插槽: 父组件传内容到子组件显示
1、 匿名插槽： 没有指定某一个插槽，全部都显示
2、 具名插槽： 指定插槽显示内容
3、 作用域插槽： 可以进行数据绑定，父子组件通讯

-->