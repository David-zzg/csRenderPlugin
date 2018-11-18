function handleParseFilePath(expression) {
    return expression.replace(/\s*PARSE_PATH\s*\(\s*['"]\s*([^'"]+)['"]\s*\)\s*/, '$1');
}

const typeObj = {
    VAR: 'var',
    INCLUDE: 'include',
};

function getExpress(content, callback) {
    // 获取cs语法中的expression
    const pattern = /<\s*\?\s*cs\s*([^\?]+)\s*\?\s*>/g;
    return content.replace(pattern, function (raw, expression) {
        expression = expression.replace(/\s/g, '');
        return callback(getExpressObj(expression));
    });
}

/**
 * 解析cs语法
 * @param str
 * @returns {*}
 */
function getExpressObj(str) {
    const arr = str.split(':');
    if (arr.length === 2) {
        return {
            type: arr[0],
            expression: arr[1],
            raw: str
        }
    }
    return {
        type: null
    }
}

module.exports = {
    getExpress: getExpress,
    handleParseFilePath: handleParseFilePath,
    typeObj:typeObj
}