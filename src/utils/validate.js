/** 校验用户名 */
export function validUsername(str) {
    const valid_map = ['admin', 'editor']
    
    return valid_map.indexOf(str.trim()) >= 0
}

/** 判断是否为外部连接 */ 
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}