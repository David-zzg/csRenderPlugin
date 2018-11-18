const csFor = require('../libs/csFor');
const csVarRender = require('./csVar');


function render(content, variable) {
    return csFor.parse(content, (obj) => {
        with (variable) {
            const arr = eval(obj.array);
            if (Array.isArray(arr)) {
                const strArr = arr.map((strItem) => {
                    return csVarRender(obj.value, {
                        [obj.item]:strItem
                    });
                });
                return strArr.join('\n');
            }
            return `数组${obj.array}不是数组，请检查`
        }
    });
}

module.exports = render;