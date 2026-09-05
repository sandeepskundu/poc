const create = async (rval, appConfig, req, units) => {
    let reset = req.helpers.json.val(units, 'numbers', {});
    let url = req.helpers.json.val(appConfig, 'scssConfig.dirsPath.variables');
    for(const a in reset){
        let item = reset[a];
        if(item){
            rv = `$${a}:(\n${await req.helpers.scss.list.prepair(``, reset[a], 0)}\n);\n\n`;
            rval = await req.helpers.scss.import.add(rval, a);
            await req.helpers.file.writer.async.write(`${url}/_${a}.scss`, rv);
        }
    }

    return rval;
}

exports.create = create;