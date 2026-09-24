exports.storageKey = 'SCHEMA_BUILDER';
exports.keyRegex = /^[a-zA-Z0-9_]*$/;
exports.dataType = ['string', 'number', 'boolean', 'object', 'array', 'function', 'jsx', 'sandeep', 'mandeep'];

exports.iconByType = {
    string:'🔤',
    number:'🔢',
    boolean:'🌗',
    object:'📁',
    array:'📋',
    function:'⚡',
    jsx:'⚛️',
};

exports.dvalueByType = (type) => {
    switch (type) {
        case 'string':
            return '';
        case 'number':
            return 0;
        case 'boolean':
            return false;
        case 'function':
            return '() => {\n  return null;\n}';
        case 'jsx':
            return '<div className="custom-node">\n  <span>Rendered Item</span>\n</div>';
        case 'object':
        case 'array':
        default:
            return undefined;
    }
};