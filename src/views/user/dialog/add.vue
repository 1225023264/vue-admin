<template>
  <el-dialog title="新增" :visible.sync="data.dialog_info_flag" @close="close" width="700px" @opened="openDialog">
    <el-form :model="data.form" ref="addInfoForm">
      <el-form-item label="用户名：" :label-width="data.formLabelWidth" prop="category">
        <el-input placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="姓名：" :label-width="data.formLabelWidth"  prop="title">
         <el-input placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号：" :label-width="data.formLabelWidth" prop="content">
        <el-input  placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="地区：" :label-width="data.formLabelWidth" prop="content">
        <!-- <CityPicker :cityPickerLevel="['province','city','area']" :cityPickerData.sync="data.cityPickerData" /> -->
        <CityPicker :cityPickerData.sync="data.cityPickerData" />
        {{ data.cityPickerData }}
      </el-form-item>
      <el-form-item label="是否启用：" :label-width="data.formLabelWidth" prop="content">
        <el-radio v-model="data.roleStatus" label="1">禁用</el-radio>
        <el-radio v-model="data.roleStatus" label="2">启用</el-radio>
      </el-form-item>
      <el-form-item label="角色：" :label-width="data.formLabelWidth" prop="content">
        <el-checkbox-group v-model="data.roleCode">
          <el-checkbox v-for="item in data.roleItem" :key="item.role" :label="item.role">{{ item.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="danger" :loading="data.submitLoading" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { AddInfo } from "@/api/news";
import { GetRole } from "@/api/user";
import { reactive, ref, watchEffect } from "@vue/composition-api";
// 组件
import CityPicker from "@c/CityPicker";
export default {
  name: "dialogInfo",
  components: { CityPicker },
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    category: {
      type: Array,
      default: () => []
    }
  },
  // vue2.0
  // data(){
  //   return{
  //     dialog_info_flag: false,
  //     formLabelWidth: '70px',
  //     form: {
  //       category: "",
  //       title: "",
  //       content: ""
  //     },
  //     categoryOption: [],
  //     submitLoading: false
  //   }
  // },
  setup(props, { emit, root, refs }) {
    /**
     * 数据
     */
    const data = reactive({
      dialog_info_flag: false,    // 弹窗标记
      // 城市数据
      cityPickerData: {},
      formLabelWidth: '90px',
      form: {
        category: '',
        title: '',
        content: ''
      },
      // 是否启用状态
      roleStatus: "1",
      // 角色
      roleCode: ['A','B'],
      // 角色选项
      roleItem: [],
      // 分类下拉
      categoryOption: [],
      // 按钮加载
      submitLoading: false
    });
    /**
     * 请求角色
     */
    const getRole = () => {
      // console.log(22222)
      GetRole().then(response => {
        data.roleItem = response.data.data
        // console.log(response.data.data)
      })
    }
    /**
     * 弹窗打开,动画结束时
     */
    const openDialog = () => {
      getRole() 
    }

    /********************************************************************
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     */
    // watch
    watchEffect(() => data.dialog_info_flag = props.flag);
    /**
     *  vue2.0 methods
     */
    const close = () => {
      data.dialog_info_flag = false;
      resetForm()
      emit("update:flag", false);
    };
    
    const resetForm = () => {
      refs.addInfoForm.resetFields();
      // data.form.category = '',
      // data.form.title = '',
      // data.form.content = ''
    }
    const submit = () => {
      let requestData = {
          categoryId: data.form.category,
          title: data.form.title,
          content: data.form.content,
      }
      if(!data.form.category){
        root.$message({
          message: '分类不能为空！！',
          type: 'error'
        })
        return false;
      }else if(!data.form.title){
        root.$message({
          message: '标题不能为空！！',
          type: 'error'
        })
        return false;
      }else if(!data.form.content){
        root.$message({
          message: '概况不能为空！！',
          type: 'error'
        })
        return false;
      }
      data.submitLoading = true
      AddInfo(requestData).then(response => {
        let responseData = response.data
        // console.log(data)
        root.$message({
          message: responseData.message,
          type: 'success'
        })
        data.submitLoading = false
        // 刷新表单
        emit("getListAdd");
        // 重置表单
        resetForm()
        // root.$refs['addInfoForm'].resetFields();
      }).catch(error => {
        data.submitLoading = false
      })
    }
    return {
      data,
      // methods
      close,
      openDialog,
      submit
    };
  }
};
</script>
<style scoped>
</style>