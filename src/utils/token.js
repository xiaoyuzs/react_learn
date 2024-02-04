const tokenKey = 'token_key'

function setToken(token) {
    localStorage.setItem(tokenKey,token)
}

function getToken() {
    return localStorage.getItem(tokenKey)
}

function removeToken() {
    localStorage.removeItem(setToken)
}

export {
    setToken,
    getToken,
    removeToken
}