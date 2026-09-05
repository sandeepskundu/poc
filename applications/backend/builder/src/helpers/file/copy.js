const fs = require("fs");
const fsE = require('fs-extra')


const copy = (srcDir, dstDir) => {
    let results = [];
    let list = fs.readdirSync(srcDir);
	let src, dst;

    list.forEach((file) => {
        src = srcDir + '/' + file;
		dst = dstDir + '/' + file;

        let stat = fs.statSync(src);

        if (stat?.isDirectory()) {
			try {
				//console.log('creating dir: ' + dst);
				fs.mkdirSync(dst);
			} catch(e) {
				//console.log('directory already exists: ' + dst);
			}
			results = results.concat(copy(src, dst));
		} else {
			try {
				//console.log('copying file: ' + dst);

				//console.log(fs.readFileSync(src));
				//fs.createReadStream(src).pipe(fs.createWriteStream(dst));
				fs.writeFileSync(dst, fs.readFileSync(src));
			} catch(e) {
				console.log('could\'t copy file: ' + dst);
			}
			results.push(src);
		}
    });
    return results;
}

const asyncCopy = async (org, dest) => {
	if(dest && org){
		try {
			await fsE.copy(org, dest);
		 } catch (err) {
			console.error(err)
		 }
	}
	
}

module.exports = {
	copy:copy,
	async:asyncCopy
}