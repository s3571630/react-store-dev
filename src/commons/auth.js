import decode from 'jwt-decode';
const JWT = 'store_token_id'

const setToken = token =>{
    localStorage.setItem(JWT, token)
}

// 解碼 token
const getToken = token =>{
    return localStorage.getItem(JWT)
}

const isLogin = ()=>{
    const jwtToken = getToken();
    return !!jwtToken && !isLoginExpired(jwtToken)
}

const isLoginExpired = token =>{
    try {
        const _info = decode(token);
        // 拿到過期時間 並把現在時間轉換成一樣的單位 小於當前時間 過期
        if(_info.exp < Date.now / 1000){
            return true
        }else return false;
    } catch (error) {
        return false
    }
}

const getUser = () =>{
    const jwtToken = getToken();
    // 安裝專門解碼程式 jwt-decode 使用decode
    // 判斷是否登入 若否傳null
    if(isLogin()){
        const user = decode(jwtToken)
        return user;
    }else{
        return null
    }

}
const logout = () =>{
    localStorage.removeItem(JWT)
}
// 讓他變全局的變數方便使用 不用導入
global.auth = {
    setToken,
    getUser,
    logout,
    isLogin,
    getToken
}
