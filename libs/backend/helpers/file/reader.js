const fs = require('fs');
const {readdir} = require('fs/promises');
const path = require('path');

const getDetails = (rval, src) => {
    fs.readdirSync(src).forEach(file => {
        const p = path.join(src, file);
        if (fs.statSync(p).isDirectory()){
            rval.dirs.push(p);
            rval = getDetails(rval, p);
        } else {
            rval.files.push(p);
        }
    });

    return rval;
}

const dirAndFileList = (src) => {
    return getDetails({
        dirs:[],
        files:[]
    }, src)
}

const read = (url, charCode) => {
    try {
        return fs.readFileSync(url, (charCode?charCode:'utf8'), async (error, data) => { 
            if(error){
                return null;
            }else{
                return data;
            }
        });
    } catch (err) {
        return null;
    }
}

const dirs = async (src) =>{
    if(fs.existsSync(src)) {
        return (await readdir(src, { withFileTypes: true })).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)
    }else{
        return []
    }
}

const dirListBySync = (src, callback) => {
    readdir(src, { withFileTypes: true }, (err, files) => {
        if (err) {
            callback([])
        } else {
            callback(files.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name))
        }
    })
}

const init = (url, charCode, type) => {
    let rval = read(url, charCode);

    if(type === 'json'){
        rval = rval || '{}';
        try {
            rval = JSON.parse(rval);
        } catch (err) {
            rval = {};
        }
    }

    return rval;
}


exports.async = {
    init:async (url, charCode, type) => {
        return await init(url, charCode, type);
    },

    read:read,
    dirs:dirs
}

exports.sync = {
    dirList:dirListBySync,
    dirAndFileList:dirAndFileList
}