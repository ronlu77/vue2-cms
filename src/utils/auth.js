import Cookies from "js-cookie";

// cookies 存储 token 的键名
const ADMIN_TOKEN = "Admin_token"

/** 
 * @description: 获取 token, 未查询到相应的值返回 ""
*/
export function getToken() {
    return Cookies.get(ADMIN_TOKEN)
}

export function setToken(token) {
    return Cookies.set(ADMIN_TOKEN, token)
}

export function removeToken() {
    return Cookies.remove(ADMIN_TOKEN)
}

