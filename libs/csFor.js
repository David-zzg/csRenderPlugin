const util  = require('./util');

/**
 * 解析foreach规则
 * @param content
 * @param callback
 */
function parse(content, callback) {
    const pattern = /<\s*\?\s*cs\s*each:([\s\S]+?)<\s*\?\s*cs\s*\/each\s*\?>/g;
    return content.replace(pattern, function () {
        // 每个block块代表一个完整的each
        const block = arguments[0];
        // 获取遍历的内容
        const value = util.exculeFirstLineAndLastLine(block);
        const itemPattern = /<\s*\?\s*cs\s*each:\s*([^=\s]+?)\s*=\s*([^\s\?]+?)\s*\?\s*>/g;
        let item;
        let array;
        block.replace(itemPattern,function () {
            item = arguments[1];
            array = arguments[2];
        })
        return callback && callback({
            type:'for',
            value,
            item,
            array
        })
    });
}



module.exports = {
    parse,
}