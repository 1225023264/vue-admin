<template>
  <el-dialog
    title="新增"
    :visible.sync="data.dialog_info_flag"
    @close="close"
    width="700px"
    @opened="openDialog"
  >
    <el-form :model="data.form" ref="addInfoForm" :rules="rules">
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
          <el-checkbox
            v-for="item in data.roleItem"
            :key="item.role"
            :label="item.role"
          >{{ item.name }}</el-checkbox>
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
import { GetRole, UserAdd } from "@/api/user";
import { reactive, ref, watchEffect } from "@vue/composition-api";
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
    category: {
      type: Array,
      default: () => []
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
        // console.log(stripscript(value))
        //过滤后的数据
        data.form.password = stripscript(value)
        value = data.form.password

        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (validatePass(value)) {
          callback(new Error('密码为6至20位数字+字母'));
        } else {
          callback();
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
      // 角色选项
      roleItem: [],
      // 按钮加载
      submitLoading: false
    });
    
      // 表单的验证
       
      const rules = reactive({
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
        ]
      });
    // watch
    watchEffect(() => (data.dialog_info_flag = props.flag));

    /*******************************************************
     * *************************
     * *********************
     * ************** */
    /**
     * 请求角色
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
      getRole();
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
      data.formLabelWidth = {};
      refs.addInfoForm.resetFields();
    };

    
    const submit = () => {
      
      if (data.form.role.length === 0) {
        root.$message({
          message: "请选择角色类型！！！",
          type: "error"
        })
        return false
      }

      /**
       * 数据引用类型  脱离
       * 一条线上的东西
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
      let requestData = JSON.parse(JSON.stringify(data.form));

      requestData.role = requestData.role.join('');     //  数组转字符串， 默认以，号隔开
      requestData.region = JSON.stringify(data.cityPickerData);



      // console.log(requestData)

      // 深拷贝 JSON.stringify(requestData)


      UserAdd(requestData).then(response => {
        console.log(response.data.data)
        resetForm()
      })
    };
    return {
      data,
      rules,
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