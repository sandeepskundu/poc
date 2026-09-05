let size = require('./../../../controllers/frontend/scss/schema/units/font-sizes');
let family = require('./../../../controllers/frontend/scss/schema/units/font-family');

const codes = (req, res, next) => {
    let rval = {};
    let sizes = req.helpers.json.val(size, 'data.fonts-sizes');

    for(const a in family){
        rval[a] = req.helpers.json.copy(family[a]);
    }

    for(const a in sizes){
        let sel = '';
        let map = {
            'txt':"Text ",
            'dis':"Head "
        }
        sizes[a].oldCode = sizes[a].oldCode || sizes[a].code;
        let code = sizes[a].oldCode;
        let selector = req.helpers.json.val(sizes[a], 'selectors');

        for(const b in selector){
            sel = selector[b];
            break;
        };

        if(map[code]){
            sizes[a].label = `${map[code]}${sel}`;
        }

        sizes[a].code = `${code}-${sel}`;
    };

    rval.data.sizes = sizes;

    return rval;
}

const routeAction = async (req, res, next) => {
    let rval = codes(req, res, next);
        req.helpers.express.response.send('json', rval, 200, req, res, next);
}

exports.routeAction = routeAction;