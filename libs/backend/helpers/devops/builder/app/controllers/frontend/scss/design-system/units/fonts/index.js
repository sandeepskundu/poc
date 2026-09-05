const family = async (appConfig, req, units) => {
    const rval = {};
    const fonts = req.helpers.json.val(units, 'fontFamilies.data.fonts');

    for(const a in fonts){
        const c = fonts[a].code;
        const fm = fonts[a].family;
        rval[fm] = rval[fm] || {};
        rval[fm][c] = {
            type:fonts[a].type,
            weight:fonts[a].weight || 400,
        };
    }

    return rval;
}

const sizes = async (appConfig, req, units) => {
    const rval = {};
    const cssProps = {
        "font-size":true,
        "tracking":true,
        "line-height":true
    };

    let fonts = req.helpers.json.val(units, 'fontSize.data.fonts-sizes');
        fonts = req.helpers.json.copy(fonts);

    const mapProps = (arg) => {
        const rv = {};
        for(const a in cssProps){
            if(arg[a]){
                rv[a] = arg[a]
            }
        }
        return rv;
    }

    for(const a in fonts){
        const sel = fonts[a].selectors;
        const item = req.helpers.json.copy(fonts[a]);
        const sl = req.helpers.data.type.is(sel, 'list');
        const str = req.helpers.data.type.is(sl, 'string');

        if(sl && sel.length > 0){
            for(const b in sel){
                if(sel[b]){
                    rval[`${fonts[a].code}-${sel[b]}`] = mapProps(item)
                }
            }
        }else{
            if(str){
                rval[`${fonts[a].code}-${sel}`] = mapProps(item)
            }
        }
    }

    return rval;
}

const create = async (rval, appConfig, req, units) => {
    let file = 'fonts';
    let size = await sizes(appConfig, req, units);
    let fmly = await family(appConfig, req, units);
    let t = `$fonts-families:(\n${await req.helpers.scss.list.prepair(``, fmly, 0)}\n);\n\n`;
    let s = `$fonts-size:(\n${await req.helpers.scss.list.prepair(``, size, 0)}\n);\n`;

    let url = req.helpers.json.val(appConfig, 'scssConfig.dirsPath.variables');
        await req.helpers.file.writer.async.write(`${url}/_${file}.scss`, t+s);

    return req.helpers.scss.import.add(rval, file);
}

exports.create = create;