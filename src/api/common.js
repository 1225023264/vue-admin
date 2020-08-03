import { GetCategory, GetCategoryAll } from "@/api/news";
import { reactive } from "@vue/composition-api";

export function common(){
    const categoryItem = reactive({
        item: []
    });
    /**
     * 获取分类  vue3.0 方法封装
     */
    const getInfoCategory = () => {
        GetCategory({}).then(response => {
            categoryItem.item = response.data.data.data
        }).catch(error => {})
    }

    /**
     * 获取全部分类  vue3.0 方法封装
     */
    const getInfoCategoryAll = () => {
        GetCategoryAll({}).then(response => {
            categoryItem.item = response.data.data
        }).catch(error => {})
    }

    return {
        getInfoCategory,
        getInfoCategoryAll,
        categoryItem
    }
}