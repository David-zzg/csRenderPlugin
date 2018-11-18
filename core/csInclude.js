const fs = require('fs');
const path = require('path');
const util = require('../libs/util');
const csInclude = require('../libs/csInclude');


function readCsFile(_filePath, {basePath}) {
    const filePath = path.join(basePath, _filePath);
    const fileContent = readFile(filePath, `找不到文件${_filePath}`);
    return readCsContent(fileContent, {basePath});
}


function readFile(filePath, defaultContent) {
    return util.readFile(filePath, defaultContent);
}

function readCsContent(content, {basePath}) {
    return csInclude.parse(content, (obj) => {
        return readCsFile(obj.value, {basePath});
    })
}

function renderContent(content, {basePath}) {
    let match = false;
    const result =  csInclude.parse(content, (obj) => {
        const filePath = path.join(basePath,obj.value);
        return readFile(filePath,`找不到文件${filePath}`);
    });
    return {
        match,
        result
    }
}

module.exports = {
    readCsFile,
    readCsContent,
    renderContent
}