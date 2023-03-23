import Cookies from "js-cookie";

const ADMINTOKEN = "Admin_token"

export function getToken() {
    return Cookies.get(ADMINTOKEN)
}

export function setToken(token) {
    return Cookies.set(ADMINTOKEN, token)
}

export function removeToken() {
    return Cookies.remove(ADMINTOKEN)
}

