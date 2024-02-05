import axios from "axios";
import { getToken,removeToken} from "./token";
import { removeUserInfo } from "./userInfo";
import router from "@/router";

const request = axios.create({
    baseURL :'http://geek.itheima.net/v1_0',
    timeout:5000
})

//请求拦截器
request.interceptors.request.use((config)=> {
    const token = getToken()
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
},(error) => {
    return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use((response)=> {
    return response.data
},(error) => {
    if(error.response.status === 401) {
        removeToken()
        removeUserInfo()
        router.navigate("/login").then(()=> {
            window.location.reload();
        })
    }
    console.dir(error)
    return Promise.reject(error)
})

export {request}