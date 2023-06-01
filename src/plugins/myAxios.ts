import axios, {AxiosInstance} from "axios";
import {closeToast, showLoadingToast} from "vant";

// @ts-ignore
const isDev = process.env.NODE_ENV === 'development'

const myAxios: AxiosInstance = axios.create({
    baseURL: isDev ? 'http://localhost:8080/api' : '线上的地址'
})

// 跨域相关
myAxios.defaults.withCredentials = true

// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    showLoadingToast({
        duration: 0,
        message: "加载中"
    });
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    closeToast();
    if (response?.data?.code === 40100) {
        const redirectUrl = window.location.href;
        window.location.href = `/user/login?redirect=${redirectUrl}`
    }
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error).finally(() => closeToast());
});

export default myAxios