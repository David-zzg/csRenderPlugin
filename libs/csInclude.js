/**
 * 单纯的解析cs include语法
 * @param content
 * @param callback
 * @returns {XML|void|*|string}
 */
function parse(content,callback) {
    const pattern = /<\s*\?\s*cs\s*include:PARSE_PATH\(['"]([^'"]+)['"]\)\s*\?\s*>/g;
    return content.replace(pattern,(...arg)=>{
        return callback({
            type:'include',
            value:arg[1]
        });
    });
}

module.exports = {
    parse,
}