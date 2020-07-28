<template>
  <div id="category">
    <el-button type="danger" @click="addFirst({type: 'category_first_add'})">添加一级分类</el-button>
    <hr class="hr-e9e9e9" />
    <!-- <hr style="margin-left: -30px; margin-right: -30px;" /> -->
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="category-wrap">
            <div class="category" v-for="firstItem in category.item" :key="firstItem.id">
              <!-- 一级分类 -->
              <h4>
                <svg-icon icon-class="plus"></svg-icon>
                {{ firstItem.category_name }}
                <div class="button-group">
                  <el-button size="mini" type="danger" @click="editCategory({ data: firstItem, type: 'category_first_edit' })" round>编辑</el-button>
                  <el-button size="mini" type="success" round>添加子级</el-button>
                  <el-button size="mini" round @click="deleteCategoryComfirm(firstItem.id)">删除</el-button>
                </div>
              </h4>
              <!-- 子级分类 -->
              <ul v-if="firstItem.children">
                <li v-for="childrenItem in firstItem.children" :key="childrenItem.id">
                  {{ childrenItem.category_name }}
                  <div class="button-group">
                    <el-button size="mini" type="danger" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <h4 class="menu-title">一级分类编辑</h4>
          <el-form label-width="142px" class="from-wrap" ref="categoryForm">
            <el-form-item label="一级分类名称：" prop="categoryName" v-if="category_first_input">
              <el-input v-model="form.categoryName" :disabled="category_first_disabled"></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称：" prop="secCategoryName" v-if="category_children_input">
              <el-input v-model="form.secCategoryName" :disabled="category_children_disabled"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="submit" :loading="submit_button_loading" :disabled="submit_button_disabled">确定</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { AddristCategory, GetCategory, DeleteCategory, EditCategory } from "@/api/news";
import { reactive, ref, onMounted, watch } from "@vue/composition-api";
import { global } from "@/utils/global_V3.0"; 
import { common } from "@/api/common";
export default {
  name: "category",
  setup(props, { root, refs }) {
    // global
    const { confirm } = global();
    const { getInfoCategory, categoryItem } = common();
    /**
     * reactive
     */
    const form = reactive({
      categoryName: "",
      secCategoryName: ""
    });

    const category = reactive({
      item: [],
      current: []
    });

    //ref
    const submit_button_type = ref('');
    const submit_button_loading = ref(false);
    const category_first_input = ref(true);
    const category_children_input = ref(true);
    const category_first_disabled = ref(true);
    const category_children_disabled = ref(true);
    const submit_button_disabled = ref(true);
    const deleteId = ref('');

    /**
     * methods v2.0 生命周期
     */
    const submit = () => {
      if (submit_button_type.value == 'category_first_add') {
        addFirstCategory()
      }
      if (submit_button_type.value == 'category_first_edit') {
        editFirstCategory()
      }
      
    };

    const addFirstCategory = () => {
      if (!form.categoryName) {
        root.$message({
          message: "分类名称不能为空",
          type: "error"
        });
        return false;
      }
      // 按钮加载状态
      submit_button_loading.value = true

      AddristCategory({ categoryName: form.categoryName }).then(response => {
          let data = response.data;
          if (data.resCode === 0) {
            root.$message({
              message: data.message,
              type: "success"
            });
            /**
             * 两种处理方法
             * 1、请求获取分类接口(缺点：浪费资源)
             * 2、直接push，请求接口后返回的数据
             */
            category.item.push(response.data.data)
            // 数组的方法,添加数组求尾
            // console.log(response.data.data)
            // getCategory()
          }
          submit_button_loading.value = false
          form.categoryName = ''
          form.secCategoryName = ''
        })
        .catch(error => {
          submit_button_loading.value = false
          form.categoryName = ''
          form.secCategoryName = ''
        });
    }

    const addFirst = (params) => {
      submit_button_type.value = params.type
      category_first_input.value = true;
      category_children_input.value = false;
      category_first_disabled.value = false;
      submit_button_disabled.value = false;
      resetInput(params)
      // console.log(params)
      // 按alt+左右方向键，可以返回光标上次，或下次的位置
    };

    // 重置输入框
    const resetInput = (params) => {
          form.categoryName = ''
          form.secCategoryName = ''
    }

    // 删除
    const deleteCategoryComfirm = (categoryID) => {
        deleteId.value = categoryID
        confirm({
            content: "确认删除当前信息，确认后将无法恢复！！",
            tip: '警告',
            fn: deleteCategory, 
            catchFn:() => {
                deleteId.value = '';
            }
        })
    }
        // console.log('1111111')
        // DeleteCategory({ categoryId: categoryID }).then(response => {
        //     console.log(response)
        // }).catch(error => {

        // })
    const deleteCategory = () => {
        // console.log(deleteId.value)
        DeleteCategory({ categoryId: deleteId.value }).then(response => {
            // 操作数组 splice
            /**
             * 两个参数的时候是删除，三个参数是替换\插入
             * splice('指定起始位置'，2，{})
             * splice(1,2,{})
             * [
             * {id: "123", category_name:"sdf df"}
             * {id: "123", category_name:"sdf df"}
             * {id: "123", category_name:"sdf df"}
             * ]
             */
            // let index = category.item.findIndex(item => item.id == deleteId.value);
            // 删除数组指定元素
            // category.item.splice(index,1);
            /**
             * es6 findIndex
             * filter  数据过滤 数组替换
             */
            let newData = category.item.filter(item => item.id != deleteId.value);      // 数据过滤 数组替换
            category.item = newData;
        }).catch(error => {

        })
    }
    
    // 修改
    const editCategory = (params) => {
        submit_button_type.value = params.type
        category_children_input.value = false;
        category_first_disabled.value = false;
        submit_button_disabled.value = false;
        // 一级名称输入还原名称
        form.categoryName = params.data.category_name
        // 储存当前的数据对象
        category.current = params.data
    }

    const editFirstCategory = () => {
      if (category.current.length == 0) {
        root.$message({
          message: "未选择分类！！",
          type: "error"
        })
        return false
      }
      let requestData = {
        id: category.current.id,
        categoryName: form.categoryName
      }
      EditCategory(requestData).then(response => {
        let responseDate = response.data
        root.$message({
          message: responseDate.message,
          type: "success"
        })
        category.current.category_name = responseDate.data.data.categoryName;
        // let data = category.item.filter(item => item.id == category.current.id);
        // data[0].category_name = responseDate.data.data.categoryName
        // 清空输入框
        form.categoryName = '';
        category.current = [];
      })
    }

    /**
     * 生命周期
     */
    // mothoeds 2.0写法    // DOM 挂载完成时执行, ( 页面DOM元素完成时，实例完成 )
    onMounted(() => {
      getInfoCategory();
    });

    /**
     * watch 监听
     */
    watch(() => categoryItem.item, (value) => {
      category.item = value;
    })
    return {
      // ref
      category_first_input,
      category_children_input,
      submit_button_loading,
      category_first_disabled,
      category_children_disabled,
      submit_button_disabled,
      // reactive
      form,
      category,
      // methods
      submit,
      addFirst,
      deleteCategory,
      deleteCategoryComfirm,
      editCategory
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/config.scss";
.category-wrap {
  div:first-child {
    &:before {
      top: 20px;
    }
  }
  div:last-child {
    &:before {
      bottom: 21px;
    }
  }
}
.menu-title {
  line-height: 44px;
  padding-left: 22px;
  background-color: #f3f3f3;
}
.category {
  position: relative;
  line-height: 44px;
  cursor: pointer;
  &:before {
    content: "";
    position: absolute;
    left: 22px;
    top: 0;
    bottom: 0;
    width: 32px;
    border-left: 1px dotted #000;
  }
  h4 {
    position: relative;
    padding-left: 40px;
  }
  svg {
    position: absolute;
    left: 14px;
    top: 15px;
    background-color: #fff;
    font-size: 17px;
  }
  li {
    position: relative;
    padding-left: 36px;
    margin-left: 24px;
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 22px;
      width: 32px;
      border-bottom: 1px dotted #000;
    }
  }
  li,
  h4 {
    @include webkit(transition, all 0.5s ease 0s);
    &:hover {
      background-color: #f3f3f3;
      .button-group {
        display: block;
      }
    }
  }
}

.button-group {
  display: none;
  position: absolute;
  z-index: 2;
  right: 11px;
  top: -1px;
  button {
    font-size: 12px;
  }
}
.from-wrap {
  width: 410px;
  padding-top: 26px;
}
.hr-e9e9e9 {
  width: calc(100% + 60px);
  margin-left: -30px;
  border: none;
  margin-top: 30px;
  margin-bottom: 30px;
  border-bottom: 1px solid #e9e9e9;
}
</style>