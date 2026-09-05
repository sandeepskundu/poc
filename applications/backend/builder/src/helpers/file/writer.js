const {existsSync} = require('fs');
const path = require('path');
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

const write = async (url, data, charCode) => {
    const d = path.dirname(url);
    const t = await createDir(d);
    const f = await writeFileContent(url, data, charCode);
    return f;
}

exports.async = {
    write:write,
    dir:createDir
}
