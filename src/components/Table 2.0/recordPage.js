import { reactive } from "@vue/composition-api"

export function recordPage() {

    const pagiData = reactive({

    });

    const recordsPage = () => {
        console.log(23333333)
    }

    return {
        pagiData,
        recordsPage
    }
}

/**
 * 说明
 */