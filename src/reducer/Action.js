import {
    ADD,
    INCERMENT,
    USER
} from "./Base"
const add = function (num=5) {
    return {
        type: ADD,
        num
    }
}
const incerment = function (num=3) {
    return {
        type: INCERMENT,
        num
    }
}
const userData = function (data) {
    return {
        type: USER,
        data
    }
}
export {
    add,
    incerment,
    userData
}