const parse = require('../libs/csVar');

function render(content, variable, callback,endCallback) {
    let touch = false;
    const result = parse.parse(content, (obj) => {
        touch = true;
        with (variable) {
            return eval(obj.value);
        }
    });
    if (touch) {
        return callback && callback(result);
    }
    endCallback && endCallback(content);
}

module.exports = render;