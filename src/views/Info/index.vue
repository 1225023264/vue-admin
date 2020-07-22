<template>
    <div>
        <el-form :inline="true" class="demo-form-inline">
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-form-item label="类型:">
                        <el-select v-model="value" placeholder="请选择" style=" width: 120px;">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="日期:"> 
                        <el-date-picker
                            v-model="value2"
                            type="datetimerange"
                            align="right"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['12:00:00', '08:00:00']">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item label="关键字: "> 
                        <el-select v-model="search_key" style=" width: 80px;"> 
                            <el-option 
                            v-for="item in searchOption" 
                            :key="item.value"
                            :value="item.value"
                            :label="item.label"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4"> 
                    <el-input v-model="search_keyWord" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col :span="3"> 
                    <el-button type="danger">搜索</el-button>
                </el-col>
                <el-col :span="2"> 
                    <el-button type="danger" class="pull-right">新增</el-button>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
import { reactive, ref } from '@vue/composition-api'
export default {
    name: 'infoIndex',
    setup(props){
        const options = reactive ([{
          value: 1,
          label: '国际信息'
        }, {
          value: 2,
          label: '国内信息'
        }, {
          value: 3,
          label: '行业信息'
        }]);
        // 搜索关键字
        const searchOption = reactive([
            { value: "id", label:"ID" },
            { value: "title", label:"标题" },
        ])
        const search_key = ref('id');
        const value = ref('');
        const value2 = ref('');
        const search_keyWord = ref('');


        return{
            options,
            searchOption,
            value,
            value2,
            search_key,
            search_keyWord
        }
    }
}
</script>
<style lang='scss' scoped>
.box{
    height: 20px;
}
.bc-gray{
    background-color: #ccc;
}
.bc-red{
    background-color: red;
}
</style>