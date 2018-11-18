const util = require('./util');
/**
 * 解析if规则
 * @param content
 * @param callback
 */
function parse(content, callback) {
    const pattern = /<\s*\?\s*cs\s*if:([\s\S]+?)<\s*\?\s*cs\s*\/if\s*\?\s*>/g;
    return content.replace(pattern, function () {
        // 每个block块代表一个完整的if判断
        const block = arguments[0];
        const arr = [];
        parseIf(block, (obj) => {
            arr.push(obj)
        })

        parseElseIf(block, (obj) => {
            arr.push(obj)
        })

        parseElse(block, (obj) => {
            arr.push(obj)
        });

        return callback({
            type: 'if',
            value: arr
        });
    });
}

/**
 * 解析if，返回表达式和结果
 * @param content
 * @param callback
 */
function parseIf(content, callback) {
    const pattern = /<[\s]*\?\s*cs\s*if\s*:([\s\S]*?)(?=(elif|else|\/if))/g;
    content.replace(pattern, function () {
        // 这时候匹配到的是包含表达式和结果的字符串 需要分析
        const strContent = arguments[0];
        const expression = parseExpression(strContent, 'if:');
        const value = parseValue(strContent);
        callback({
            expression,
            value
        })
        return strContent;
    });
}

/**
 * 解析esleif情况
 * @param content
 * @param callback
 */
function parseElseIf(content, callback) {
    const pattern = /<[\s]*\?\s*cs\s*elif\s*([\s\S]*?)(?=(elif|else|\/if))/;
    // 避免层级太深，这里限制10
    for (let i = 0; i < 10; i++) {
        if (content.match(pattern)) {
            content = content.replace(pattern, function () {
                const strContent = arguments[0];
                const expression = parseExpression(strContent, 'elif');
                const value = parseValue(strContent);
                callback({
                    expression,
                    value
                });
                // 这里要返回argument[1] 进行下一次匹配
                return arguments[1];
            })
        }
    }
}

function parseElse(content, callback) {
    const pattern = /<[\s]*\?\s*cs\s*else\s*([\s\S]*?)(?=(elif|else|\/if))/;
    content.replace(pattern, function () {
        const value = parseValue(arguments[0]);
        callback({
            expression: null,
            value,
        });
    })
}


function getExpressPatternByType(type) {
    return new RegExp(`<[\\s]*\\?\\s*cs\\s*${type}\\s*\\(([^\\)]+)\\)`)
}

/**
 * 获取if判断的表达式
 * @param content
 * @param type
 * @returns {*}
 */
function parseExpression(content, type) {
    const pattern = getExpressPatternByType(type);
    let expression;
    content.replace(pattern, function () {
        expression = arguments[1];
    });
    return expression;
}

/**
 * 获取if判断的结果。这里采用字符串转化成数组，去头去尾的形式。虽然不太优雅，但能解决大部分问题
 * @param content
 */
function parseValue(content) {
    return util.exculeFirstLineAndLastLine(content);
}

function parseSingle() {

}

var content = `<?cs if:('zh_cn' == Language)?>
       lgdata = <?cs include:PARSE_PATH("/i18n/wallet/zh_cn/base.json") ?>;
  <?cs elif ('zh_hk' == Language || 'zh_tw' == Language)?>
       lgdata = <?cs include:PARSE_PATH("/i18n/wallet/zh_hk/base.json") ?>;
  <?cs elif ('en' == Language)?>
       lgdata = <?cs include:PARSE_PATH("/i18n/wallet/en/base.json") ?>;
  <?cs else ?>
       lgdata = <?cs include:PARSE_PATH("/i18n/wallet/en/base.json") ?>;
  <?cs /if ?>`;

var content = `<?cs if:('zh_cn' == Language)?>
       lgdata = <?cs include:PARSE_PATH("/i18n/wallet/zh_cn/base.json") ?>;
       lgdata = <?cs include:PARSE_PATH("/i18n/wallet/zh_hk/base.json") ?>;
       lgdata = <?cs include:PARSE_PATH("/i18n/wallet/en/base.json") ?>;lgdata = <?cs include:PARSE_PATH("/i18n/wallet/zh_hk/base.json") ?>;
       lgdata = <?cs include:PARSE_PATH("/i18n/wallet/en/base.json") ?>;lgdata = <?cs include:PARSE_PATH("/i18n/wallet/zh_hk/base.json") ?>;
       lgdata = <?cs include:PARSE_PATH("/i18n/wallet/en/base.json") ?>;
  <?cs elif ('zh_hk' == Language || 'zh_tw' == Language)?>
       lgdata = <?cs include:PARSE_PATH("/i18n/wallet/zh_hk/base.json") ?>;
       lgdata = <?cs include:PARSE_PATH("/i18n/wallet/en/base.json") ?>;
  <?cs /if ?>`;

// var content = `<?cs if:('zh_cn' == Language)?>
//        lgdata = <?cs include:PARSE_PATH("/i18n/wallet/zh_cn/base.json") ?>;
//   <?cs /if ?>`;

// parse(content, (obj) => {
//     console.log(obj);
// });


module.exports = {
    parse,
}