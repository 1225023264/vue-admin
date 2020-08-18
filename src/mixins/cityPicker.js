import { GetCityPicker } from "@/api/common";
import { reactive, toRefs } from '@vue/composition-api';

export function cityPicker(){
    
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
            resetValue({type: "city"})
            GetCityPicker({ type: "city", province_code: val }).then(response => {
                // console.log(response.data.data.data);
                data.cityData = response.data.data.data;
            })
        }
        /**
         * 选择城市，获取区县
         */
        const handlerCity = (val) => {
            resetValue({type: "area"})
            GetCityPicker({ type: "area", city_code: val }).then(response => {
                // console.log(response.data.data.data);
                data.areaData = response.data.data.data;
            })
        }
        /**
         * 选择区县，获取街道
         */
        const handlerArea = (val) => {
            resetValue({type: "street"})
            GetCityPicker({ type: "street", area_code: val }).then(response => {
                // console.log(response.data.data.data);
                data.streetData = response.data.data.data;
            })
        }

        /**
         * 重置选项
         */
        const resetValue = (params) => {
            
            const valueJson = {
                city: ['cityValue', 'areaValue', 'streetValue'],
                area: ['areaValue', 'streetValue'],
                street: ['streetValue']
            }
            const arrObj = valueJson[params.type];
            // 清空指定的key值
            arrObj.forEach(item => data[item] = '')
        }

    return {
        ...toRefs(data),    // 把对象类型转为基础数据类型，可进行解构响应
        getProvince,
        handlerProvince,
        handlerCity,
        handlerArea
    }
}