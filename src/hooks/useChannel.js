//封装获取频道列表的逻辑
import { useState, useEffect } from 'react';
import { getChannelAPI } from '@/apis/article';
function useChannel() {
    // 1. 获取频道列表所有的逻辑
    // 获取频道列表
    const [channleList, setChannelList] = useState([])

    useEffect(() => {
        // 1封装函数 在函数体内调用接口
        const getChannelList = async () => {
            const res = await getChannelAPI()
            setChannelList(res.data.channels)
        }
        // 2.使用函数
        getChannelList()
    }, [])
    return channleList
}
export { useChannel }