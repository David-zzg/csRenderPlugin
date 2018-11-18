const csForRender = require('./csFor')
const csIfRender = require('./csIf')
const csIncludeRender = require('./csInclude')
const csVarRender = require('./csVar')
const util = require('../libs/util');

/**
 *
 */

function render(filePath,variable) {
    const fileContent = util.readFile(filePath,`获取文件失败:${filePath}`);
    let content = fileContent;
    content = csIfRender(content,variable);
    content = csForRender(content,variable);
    content = csIncludeRender(content,variable);
    content = csVarRender(content,variable);
    return r
    if(!fileContent){

    }
}

function renderContent(fileContent,variable,callback) {
    let content = fileContent;
    // content = csIfRender(content,variable);
    // content = csForRender(content,variable);
    // content = csIncludeRender(content,variable);
    content = csVarRender(content,variable,(_content)=>{
        csIfRender(_content,variable,()=>{

        },callback);
        content = _content;
        renderContent(content,variable,callback);
    },callback);
}

module.exports = {
    renderContent
}