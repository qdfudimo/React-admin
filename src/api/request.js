import Service from './service.js'
//登录
export function login(params) {
    return Service({
        url: '/login',
        data: params,
        method: "post",
    })
}
export function register() {
    return Service({
        url: '/register',
        method: "get",
    })
}
//验证码
export function captcha() {
    return Service({
        url: '/captcha',
        method: "get",
    })
}