import Service from './service.js'
export function login(params) {
    return Service({
        url: '/login',
        data:params,
        method: "post",
    })
}
export function register() {
    return Service({
        url: '/register',
        method: "get",
    })
}