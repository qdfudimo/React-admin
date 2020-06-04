import {
    USER
} from './Base'
const init = {
    isLogin: false,
    username: "",
    password: "",
    checked:true,
    isFresh:false
}
const reducer = function (state = init, action = {}) {

    switch (action.type) {
        case USER:
            return {
                ...state,
                ...action.data
            }
            default:
                return {
                    ...state
                }
    }
}
export {
    reducer
}