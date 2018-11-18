const csIf = require('../libs/csIf');


function render(content, variable) {
    let match = false;
    const result = csIf.parse(content, (obj) => {
        match = true;
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
    return {
        match,
        result
    }
}

module.exports = render;