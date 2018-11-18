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

function renderContent(fileContent,{variable,config:{basePath}}) {
    let shouldContinue = false;
    let result = {result:fileContent};
    result = csIfRender(result.result,variable);
    shouldContinue += result.match;
    result = csForRender(result.result,variable);
    shouldContinue += result.match;
    result = csIncludeRender.renderContent(result.result,{basePath});
    shouldContinue += result.match;
    result = csVarRender(result.result,variable);
    shouldContinue += result.match;
    if(shouldContinue){
        return renderContent(result.result,{variable,config:{basePath}});
    }
    return result.result;

}

module.exports = {
    renderContent
}