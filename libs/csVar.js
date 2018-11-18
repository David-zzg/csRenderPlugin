function parse(content, callback) {
    const pattern = /<\s*\?\s*cs\s*var:(.*?)\s*\?\s*>/g;
    return content.replace(pattern, (...arg) => {
        return callback({
            type: 'var',
            value: arg[1]
        });
    });
}

module.exports = {
    parse
}