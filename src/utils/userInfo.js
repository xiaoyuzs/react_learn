
const userInfoKey = 'userInfo_key'

function setUserInfo(userInfo) {
    // 把对象转换成字符串
    localStorage.setItem(userInfoKey, JSON.stringify(userInfo))
}

function getUserInfo() {
    // 把字符串转换成对象
    return JSON.parse(localStorage.getItem(userInfoKey))
}

function removeUserInfo() {
    // 删除 localStorage 中的键和值
    localStorage.removeItem(userInfoKey)
}

export {
    setUserInfo,
    getUserInfo,
    removeUserInfo
}