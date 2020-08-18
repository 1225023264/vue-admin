<template>
    <div class="overflow-h">
        <el-row :gutter="10">
            <el-col :span="6">
                <el-select v-model="data.provinceValue" @change="handlerProvince">
                    <el-option v-for="item in data.provinceData" :key="item.PROVINCE_CODE" :value="item.PROVINCE_CODE" :label="item.PROVINCE_NAME"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-select v-model="data.cityValue" @change="handlerCity">
                    <el-option v-for="item in data.cityData" :key="item.CITY_CODE" :value="item.CITY_CODE" :label="item.CITY_NAME"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-select v-model="data.areaValue" @change="handlerArea">
                    <el-option v-for="item in data.areaData" :key="item.AREA_CODE" :value="item.AREA_CODE" :label="item.AREA_NAME"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-select v-model="data.streetValue" >
                    <el-option v-for="item in data.streetData" :key="item.STREET_CODE" :value="item.STREET_CODE" :label="item.STREET_NAME"></el-option>
                </el-select>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { GetCityPicker } from "@/api/common";
import { reactive } from '@vue/composition-api';
export default {
    name: "cityPicker",
    setup(props){

        const data = reactive({
            provinceValue: "",
            cityValue: "",
            areaValue: "",
            streetValue: "",
            provinceData: [],
            cityData: [],
            areaData: [],
            streetData: [],
        })

        /**
         * 获取省份
         */
        const getProvince = () => {
            GetCityPicker({ type: "province" }).then(response => {
                // console.log(response.data.data.data);
                data.provinceData = response.data.data.data;
            })
        }
        /**
         * 选择省份，获取城市
         */
        const handlerProvince = (val) => {
            GetCityPicker({ type: "city", province_code: val }).then(response => {
                // console.log(response.data.data.data);
                data.cityData = response.data.data.data;
            })
        }
        /**
         * 选择城市，获取区县
         */
        const handlerCity = (val) => {
            GetCityPicker({ type: "area", city_code: val }).then(response => {
                // console.log(response.data.data.data);
                data.areaData = response.data.data.data;
            })
        }
        /**
         * 选择区县，获取街道
         */
        const handlerArea = (val) => {
            GetCityPicker({ type: "street", area_code: val }).then(response => {
                // console.log(response.data.data.data);
                data.streetData = response.data.data.data;
            })
        }
        // 获取省份
        getProvince()


        return {
            data,
            handlerProvince,
            handlerCity,
            handlerArea
        }
    }
}
</script>
<style lang="scss" scoped>

</style>