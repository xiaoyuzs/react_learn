import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils";
import { setToken as _setToken, getToken } from "@/utils";
import { setUserInfo as _setUserInfo,getUserInfo } from "@/utils";

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
        }
    }
})


// 结构出actionCreater

const { setToken, setUserInfo } = userStore.actions;

//获取reducer函数

const userReducer = userStore.reducer;

//异步
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        const res = await request.post('/authorizations', loginForm)
        //提交同步action进行token的存入
        dispatch(setToken(res.data.token))
    }
}

//获取个人信息
const fetchUserInfo = () => {
    return async (dispatch) => {
        const res = await request.get('/user/profile')
        dispatch(setUserInfo(res.data))
    }
}
export { setToken, fetchLogin, fetchUserInfo }

export default userReducer;
