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
            
            if (params.type === 'city') {
                data.cityValue = ""
                data.areaValue = ""
                data.streetValue = ""
            }else if(params.type === 'area'){
                data.areaValue = ""
                data.streetValue = ""
            }else if(params.type === 'street'){
                data.streetValue = ""
            }
        }

    return {
        ...toRefs(data),
        getProvince,
        handlerProvince,
        handlerCity,
        handlerArea
    }
}