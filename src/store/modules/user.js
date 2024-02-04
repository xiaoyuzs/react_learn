import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils";

const userStore = createSlice({
    name:'user',
    initialState:{
        token:""
    },
    //同步修改方法
    reducers:{
        setToken(state,action) {
            state.token = action.payload;
        }
    }
})


// 结构出actionCreater

const {setToken} = userStore.actions;

//获取reducer函数

const userReducer = userStore.reducer;

//异步
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        const res = await request.post('/authorizations',loginForm)
        //提交同步action进行token的存入
        dispatch(setToken(res.data.token))
    }
}
export {setToken,fetchLogin}

export default userReducer;
