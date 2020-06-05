/**
 * 
 * @param {splits} params 用于 "/path/val/admin" 分割成 "/path/val" 去掉最后的路径在默认展开菜单中用到
 */

function splits(params) {
    let val = params
    let i = val.split("/")
    let str = ""
    let arr =[]
    if (i.length > 1) {
        for (var l = 1; l < i.length - 1; l++) {
            str += `/${i[l]}`
            arr.push(str)
        }
    }
    return arr
}
export {
    splits
}