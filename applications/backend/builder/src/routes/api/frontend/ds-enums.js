const ds = require('./ds-props');

const maps = {
    'spaces':true,
    'layer.size':true,
    'icons.size':true,
    'fonts.fonts':true,
    'shadow.size':true,
    'input.theme':true,
    'button.size':true,
    'toggle.theme':true,
    'button.theme':true,
    'family.family':true,
    'border.radius':true,
    'animation.type':true,
    'checkbox.theme':true
}

const colors = async (rval, req, res, next) => {
    const cmap = {
        'colors.list':true,
        'colors.pairing':true
    }

    for(const a in cmap){
        let enms = {};

        if(a === 'colors.list'){
            let vals = req.helpers.json.val(ds, a, {});

            for(const a in vals){
                let cvals = req.helpers.json.val(vals[a], 'colors', {});

                for(const b in cvals){
                    let id = req.helpers.json.val(cvals[b], 'id');

                    if(id){
                        enms[id] = true;
                    }
                }
            }
        }

        if(a === 'colors.pairing'){
            enms = await parse(req, res, next, a);
        }
        
        rval = req.helpers.json.set(rval, a, enms, false, false)
    }

    return rval;
}

const parse = async (req, res, next, map) => {
    const rval = {}
    const vals = req.helpers.json.val(ds, map, {});

    for(const a in vals){
        let id = req.helpers.json.val(vals[a], 'id');

        if(id){
            rval[id] = true;
        }
    }

    return rval;
}

const enums = async (req, res, next) => {
    let rv = {};

    for(const a in maps){
        let vmap =  `ds.${a}`
        let vals = await parse(req, res, next, a);
            rv = req.helpers.json.set(rv, vmap, vals, false, false)

    }

    return await colors(rv, req, res, next);
}

const action =  async (req, res, next) => {
    req.helpers.express.response.send('json', await enums(req, res, next), 200, req, res, next);
}; 

exports.action = action;