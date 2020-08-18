<template>
    <div class="overflow-h">
        <el-row :gutter="10">
            <el-col :span="6">
                <el-select v-model="provinceValue" @change="handlerProvince">
                    <el-option v-for="item in provinceData" :key="item.PROVINCE_CODE" :value="item.PROVINCE_CODE" :label="item.PROVINCE_NAME"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-select v-model="cityValue" @change="handlerCity">
                    <el-option v-for="item in cityData" :key="item.CITY_CODE" :value="item.CITY_CODE" :label="item.CITY_NAME"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-select v-model="areaValue" @change="handlerArea">
                    <el-option v-for="item in areaData" :key="item.AREA_CODE" :value="item.AREA_CODE" :label="item.AREA_NAME"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-select v-model="streetValue" >
                    <el-option v-for="item in streetData" :key="item.STREET_CODE" :value="item.STREET_CODE" :label="item.STREET_NAME"></el-option>
                </el-select>
            </el-col>
        </el-row>
    </div>
</template>
<script>
// import { GetCityPicker } from "@/api/common";
// import { reactive } from '@vue/composition-api';
import { cityPicker } from "@/mixins/cityPicker";
import { watch } from '@vue/composition-api';
export default {
    name: "cityPicker",
    props: {
        cityPickerData: {
            type: Object,
            default: () => {}
        }
    },
    setup(props){
        console.log(props.cityPickerData)
        const { 
            // 事件
            getProvince, 
            handlerProvince,
            handlerCity,
            handlerArea,
            // 下拉赋值
            provinceData, 
            cityData,
            areaData,
            streetData,
            // 数据绑定
            provinceValue, 
            cityValue, 
            areaValue,
            streetValue
            } = cityPicker();

        watch(() => provinceValue.value, (newValue) => {
            console.log('newValue')
            console.log(newValue)
        })

        // 获取省份
        getProvince()


        return {
            // 事件
            handlerProvince,
            handlerCity,
            handlerArea,
            // 下拉赋值
            provinceData, 
            cityData,
            areaData,
            streetData,
            // 数据绑定
            provinceValue, 
            cityValue, 
            areaValue,
            streetValue
        }
    }
}
</script>
<style lang="scss" scoped>

</style>