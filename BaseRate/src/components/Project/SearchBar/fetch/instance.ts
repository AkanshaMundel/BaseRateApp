import AxiosFactory from "@src/modules/axios/AxiosFactory";

export const SearchBarInstance=AxiosFactory.createInstance({
    baseURL:'purchaser/pages/setBasicPrice/getBasicPrice'
})