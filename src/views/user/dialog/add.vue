<template>
  <el-dialog
    title="新增"
    :visible.sync="data.dialog_info_flag"
    @close="close"
    width="700px"
    @opened="openDialog"
  >
  <!-- 表单 start -->
    <el-form :model="data.form" :rules="data.rules" ref="addInfoForm">
      <el-form-item label="用户名：" :label-width="data.formLabelWidth" prop="username">
        <el-input v-model="data.form.username" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="密码：" :label-width="data.formLabelWidth" prop="password">
        <el-input type="password" v-model="data.form.password" placeholder="请输入6~20数字+字母"></el-input>
      </el-form-item>
      <el-form-item label="姓名：" :label-width="data.formLabelWidth" prop="truename">
        <el-input v-model="data.form.truename" placeholder="请输入真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号：" :label-width="data.formLabelWidth" prop="phone">
        <el-input v-model.number="data.form.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="地区：" :label-width="data.formLabelWidth" prop="region">
        <!-- <CityPicker :cityPickerLevel="['province','city','area']" :cityPickerData.sync="data.cityPickerData" /> -->
        <CityPicker :cityPickerData.sync="data.cityPickerData" />
        {{ data.cityPickerData }}
      </el-form-item>
      <el-form-item label="是否启用：" :label-width="data.formLabelWidth" prop="status">
        <el-radio v-model="data.form.status" label="1">禁用</el-radio>
        <el-radio v-model="data.form.status" label="2">启用</el-radio>
      </el-form-item>
      <el-form-item label="角色：" :label-width="data.formLabelWidth" prop="role">
        <el-checkbox-group v-model="data.form.role">
          <el-checkbox v-for="item in data.roleItem" :key="item.role" :label="item.role" >{{ item.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="danger" :loading="data.submitLoading" @click="submit('addInfoForm')">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import sha1 from "js-sha1";
import { GetRole, GetSystem, UserAdd, UserEdit } from "@/api/user";
import { reactive, ref, watchEffect, watch } from "@vue/composition-api";
import { stripscript, validateEmail, validatePass, validatePhone, validateTruename } from "@/utils/validate";
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
    editData: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { emit, root, refs }) {
    
      // 验证用户名
      let validateUsernameValue = (rule, value, callback) => {

        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if(validateEmail(value)){
          callback(new Error('用户名格式有误'));
        } else{
          callback();// true
        }
      };
      // 验证密码
      let validatePasswordValue = (rule, value, callback) => {
            /**
             * 业务逻辑
             * 1、编辑状态：
             *    需要检验：data.form.id存在并且，密码不为空时
             *    不需要检验：data.form.id存在并且，密码为空时
             * 
             * 2、添加状态
             *    需要检验：data.form.id不存在
             */
        if(data.form.id && !value) {
          callback();
        }
        
        // console.log(stripscript(value))
        if((data.form.id && value) || !data.form.id) {
        // 过滤后的数据
            if (value) {
            data.form.password = stripscript(value);
            value = data.form.password;
          }
          if (value === '') {
            callback(new Error('请输入密码'));
          } else if (validatePass(value)) {
            callback(new Error('密码为6至20位数字+字母'));
          } else {
            callback();
          }
        }
      };
      // 验证真实姓名
      let validateTruenameValue = (rule, value, callback) => {

        if (value === '') {
          callback(new Error('请输入姓名'));
        } else if(validateTruename(value)){
          callback(new Error('姓名格式有误'));
        } else{
          callback();// true
        }
      };
      // 验证手机号
      let validatePhoneValue = (rule, value, callback) => {

        if (value === '') {
          callback(new Error('请输入手机号'));
        } else if (validatePhone(value)) {
          callback(new Error('手机号码格式有误'));
        } else {
          callback();
        }
      };
      // 验证地区
      let validateRegionValue = (rule, value, callback) => {
        
        if (Object.values(value) === 0) {
          callback(new Error('请选择地区'));
        } else {
          callback();
        }
      };
      // 验证禁启用
      let validateStatusValue = (rule, value, callback) => {

        if (value === '') {
          callback(new Error('请选择是否禁用'));
        } else {
          callback();
        }
      };
      // 验证角色
      let validateRoleValue = (rule, value, callback) => {

        if (value.length === 0) {
          callback(new Error('请至少选择一个角色'));
        } else {
          callback();
        }
      };


/********************************************************************************************* */    
    /**
     * 数据
     */
    const data = reactive({
      dialog_info_flag: false, // 弹窗标记
      // 城市数据
      cityPickerData: {},
      formLabelWidth: "90px",
      form: {
        username: "",
        truename: "",
        password: "",
        phone: "",
        region: "",
        status: "2",
        role: []
      },
      // 表单的验证
      rules: reactive({
        username: [
          { validator: validateUsernameValue, trigger: 'blur' }
        ],
        password: [
            { validator: validatePasswordValue, trigger: 'blur' }
        ],
        truename: [
            { validator: validateTruenameValue, trigger: 'blur' }
        ],
        phone: [
            { validator: validatePhoneValue, trigger: 'blur' }
        ],
        region: [
            { validator: validateRegionValue, trigger: 'change' }
        ],
        status: [
            { validator: validateStatusValue, trigger: 'change' }
        ],
        role: [
            { validator: validateRoleValue, trigger: 'change' }
        ]
    }),
      // 角色选项
      roleItem: [],
      // 按钮加载
      submitLoading: false
    });
    
    // watch
    watchEffect(() => (data.dialog_info_flag = props.flag));

    /*******************************************************
     * *************************
     * *********************
     * ************** */
    /**
     * 请求角色 or 系统
     */
    const getRole = () => {
      // console.log(22222)
      GetRole().then(response => {
        data.roleItem = response.data.data;
        // console.log(response.data.data)
      });
    };
    /**
     * 弹窗打开,动画结束时
     */
    const openDialog = () => {
      // 角色 or 系统请求 
      getRole();
      // 初始值处理
      let editData = props.editData;
      // console.log(editData.id)
      if(editData.id) { // 编辑
        editData.role = editData.role.split(','); // 数组
      }else{ // 添加
        data.form.id && delete data.form.id
      }

      // 循环JSON对象
      for(let key in editData) {
        data.form[key] = editData.id ? editData[key] : ""
        // console.log(key +":"+ editData[key])
      }
      // console.log(data.form)
      // data.form = editData;
      // console.log('props.editData')
      console.log(props.editData)
    };

    /**
     *  vue2.0 methods
     */
    const close = () => {
      data.dialog_info_flag = false;
      resetForm();
      emit("update:flag", false);
    };

    const resetForm = () => {
      console.log(data.cityPickerData);
      data.cityPickerData = {};
      refs.addInfoForm.resetFields();
    };

    
    // const submit = () => {
      
    //   if (data.form.role.length === 0) {
    //     root.$message({
    //       message: "请选择角色类型！！！",
    //       type: "error"
    //     })
    //     return false
    //   }
      const submit = (formName) => {
        refs[formName].validate((valid) => {
          
            // 表单验证通过
            if (valid) {
              // console.log("通过");
              // return false;
              /**
               * 数据引用类型   脱离
               * 一条线上的东西 改的是最原始的那一份
               */
              // 深拷贝   JSON.parse(JSON.stringify(data.form))     // 字符串，再次转JSON对象   深拷贝内层嵌套的方法会无法使用
              // 浅拷贝   Object.assign({}, data.form)        // 拷贝出来的就是一个对象 浅拷贝只第一层不会有影响，只将第一层脱离出来

              /**
               * 注意事项，丢失对象
               */
              // let test = {
              //   fun: function(){},
              //   aaa: undefined,
              //   sym: Symbol(),
              //   ccc: "aa",
              //   ddd: function(){}
              // }
              // console.log(JSON.parse(JSON.stringify(test)))
              
              // 数据处理
              // let requestData = JSON.parse(JSON.stringify(data.form));
              let requestData = Object.assign({}, data.form);
              requestData.role = requestData.role.join();     //  数组转字符串， 默认以，号隔开
              requestData.region = JSON.stringify(data.cityPickerData);

              // console.log(requestData)

              // 深拷贝 JSON.stringify(requestData)
              // 添加状态，需要密码，并且加密码
              // 编辑状态，值存在，需要密码，并且加密码，负责删除
              if(requestData.id){
              //  requestData.password ? sha1(requestData.password) : delete requestData.password;
                if(requestData.password) {
                  requestData.password = sha1(requestData.password)
                }else{
                  delete requestData.password
                }
                userEdit(requestData)
                // console.log(requestData)
                }else{
                  requestData.password = sha1(requestData.password);
                  userAdd(requestData)
                }
                // UserAdd(requestData).then(response => {
                //   let data = response.data
                //   // console.log(data)
                //   root.$message({
                //     message: data.message,
                //     type: "success"
                //   })
                //   close();
                //   emit('refreshTableData');
                //   // resetForm();
                //   // emit("update:flag", false)
                // })
                // // console.log('通过');
            } else {
              // console.log('error submit!!');
              console.log("不通过");
              return false;
            }
          })
};

              const userAdd = (requestData) => {
                // console.log(requestData);
                // return false
              UserAdd(requestData).then(response => {
                let data = response.data
                root.$message({
                  message: data.message,
                  type: "success"
                })
                close();
                emit('refreshTableData');
              })
            }

              const userEdit = (requestData) => {
                // console.log(requestData);
                // return false
              UserEdit(requestData).then(response => {
                let data = response.data
                root.$message({
                  message: data.message,
                  type: "success"
                })
                close();
                emit('refreshTableData');
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