const parse = require('../libs/csVar');

function render(content, variable) {
    let match = false;
    const result = parse.parse(content, (obj) => {
        match = true;
        with (variable) {
            try{
                return eval(obj.value);
            }catch (e){
                return `解析${obj.value}失败`;
            }
        }
    });
    return {
        match,
        result
    }
}

module.exports = render;