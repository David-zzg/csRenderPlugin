const csIf = require('../libs/csIf');


function render(content, variable,callback,endCallback) {
    let touch = false;
    const result = csIf.parse(content, (obj) => {
        touch = true;
        with (variable) {
            if (!Array.isArray(obj.value)) {
                return `解析if失败`;
            }
            for (const i in obj.value) {
                const item = obj.value[i];
                // 如果有表达式且通过
                if (item.expression && eval(item.expression)) {
                    return item.value;
                } else if (item.expression === null) {
                    // 默认条件
                    return item.value;
                }
            }
            return `if条件无匹配项`
        }
    });
    if(result){
        return callback && callback(result);
    }
    endCallback && endCallback(content);
}

module.exports = render;