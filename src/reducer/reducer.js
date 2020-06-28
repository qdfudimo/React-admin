import {
    USER
} from './Base'
const init = {
    username: "",
    password: "",
    checked:true,
    isFresh:false,
    token:null
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