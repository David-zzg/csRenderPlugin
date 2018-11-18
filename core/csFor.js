const csFor = require('../libs/csFor');
const csVarRender = require('./csVar');


function render(content, variable) {
    let match = false;
    const result =  csFor.parse(content, (obj) => {
        match = true;
        with (variable) {
            let arr;
            try{
                arr = eval(obj.array);
            }catch(e){
                return `解析${obj.array}失败，请检查`
            }
            if (Array.isArray(arr)) {
                const strArr = arr.map((strItem) => {
                    const varResult = csVarRender(obj.value, {
                        [obj.item]:strItem
                    });
                    return varResult.result;
                });
                return strArr.join('\n');
            }
            return `数组${obj.array}不是数组，请检查`
        }
    });
    return {
        match,
        result
    }
}

module.exports = render;