import axios,{ CreateAxiosDefaults } from "axios";

export default class AxiosFactory {
    static createInstance<T = any>(config?: CreateAxiosDefaults<T>) {
        const basePath = "https://www.lohawalla.com/";
        const _config = config ? config : ({} as CreateAxiosDefaults<any>)
        const burl=_config.baseURL?_config.baseURL:""
        _config.baseURL=basePath+burl;
        return axios.create(_config)
    }
}
