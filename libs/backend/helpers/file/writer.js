const fs = require("fs");
const path = require('path');
const {existsSync} = require('fs');
const {mkdir, writeFile} = require('fs/promises');

const createDir = async (url) => {
    return await new Promise((resolve, reject) => {
        if(!existsSync(url)){
            mkdir(url, {recursive:true}).then(() => { 
                resolve(true);
            }).catch(() => { 
                resolve(false);
            });
        }else{
            resolve(true);
        }
    });
}

const writeFileContent = async (url, data, charCode) => {
    return await writeFile(url, data);
}

const remove = async (url) => {
    if (fs.existsSync(url)) {
        fs.unlinkSync(url);
    }
}

const write = async (url, data, charCode) => {
    const d = path.dirname(url);
    const t = await createDir(d);
    const f = await writeFileContent(url, data, charCode);
    return f;
}

exports.async = {
    write:write,
    remove:remove,
    dir:createDir
}
