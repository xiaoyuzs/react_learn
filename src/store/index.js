// 组合redux子模块 + 导出store实例

import {  configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/user";

// 从 localStorage 里获取 token
const token = localStorage.getItem('token_key') || ''


//创建store 并把token作为初始值
export default configureStore({
    reducer:{
        user:userReducer
    },
    preloadedState:{
        user:{
            token,
        }
    }
})