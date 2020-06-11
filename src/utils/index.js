/**
 * 
 * @param {splits} params 用于 "/path/val/admin" 分割成 "/path/val" 去掉最后的路径在默认展开菜单中用到
 */

function splits(params) {
    let val = params
    let i = val.split("/")
    let str = ""
    let arr = []
    if (i.length > 1) {
        for (var l = 1; l < i.length - 1; l++) {
            str += `/${i[l]}`
            arr.push(str)
        }
    }
    return arr
}
/**
 * @param {throttle}  节流函数 一段时间内只会执行一次
 */
function throttle(fn, delay) {
    var timer, content, args;
    let previous = 0;
    var later = function() {
        previous = +new Date();
        timer = null;
        fn.apply(content, args)
    }
    return function() {
        let now = +new Date();
        //下次出发fn的时间
        content = this;
        args = arguments;
        var remaining = delay - (now - previous)
            //防止修改系统时间
        if (remaining <= 0 || remaining > delay) {
            //当前时间减于以前时间大于延迟时间，立即执行
            if (timer) {
                clearTimeout(timer)
                timer = null;
            }
            previous = now;
            fn.apply(content, args)
        } else if (!timer) {
            timer = setTimeout(later, delay);
        }
    }
}
export {
    splits,
    throttle
}