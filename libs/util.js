/**
 * 获取一段文本的中间部分
 * @param content
 */
function exculeFirstLineAndLastLine(content) {
    const arr = content.split('\n');
    var l = arr.length;
    return arr.filter((item, index) => {
        return index === 0 || index === l - 1 ? false : true;
    }).join('\n');
}


function getFirseLine(content) {
    const arr = content.split('\n');
    return arr[0];
}


/**
 * 读取文件，有异常返回默认文本
 * @param filePath
 * @param defaultContent
 * @returns {*}
 */
function readFile(filePath,defaultContent) {
    try{
        return fs.readFileSync(filePath).toString();
    }catch(e){
        return defaultContent;
    }
}

module.exports = {
    exculeFirstLineAndLastLine,
    getFirseLine,
    readFile
}