import { createSlice } from "@reduxjs/toolkit";
import {
    removeToken, removeUserInfo, 
    setToken as _setToken, getToken,
    setUserInfo as _setUserInfo, getUserInfo
} from "@/utils";
import { loginAPI,getProfileAPI } from "@/apis/user";

const userStore = createSlice({
    name: 'user',
    initialState: {
        token: getToken() || "",
        userInfo: getUserInfo() || {}
    },
    //同步修改方法
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
            _setToken(action.payload)
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload;
            _setUserInfo(action.payload)
        },
        clearUserInfo(state) {
            state.token = ''
            state.userInfo = {};
            removeToken();
            removeUserInfo()
        }
    }
})


// 结构出actionCreater

const { setToken, setUserInfo,clearUserInfo } = userStore.actions;

//获取reducer函数

const userReducer = userStore.reducer;

//异步
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        const res = await loginAPI(loginForm)
        //提交同步action进行token的存入
        dispatch(setToken(res.data.token))
    }
}

//获取个人信息
const fetchUserInfo = () => {
    return async (dispatch) => {
        const res = await getProfileAPI()
        dispatch(setUserInfo(res.data))
    }
}
export { setToken, fetchLogin, fetchUserInfo,clearUserInfo }

export default userReducer;
