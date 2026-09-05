let colors = require('./../../../controllers/frontend/scss/schema/theme/base/colors.json');

const codes = (colors, req, res, next) => {
    let clr = req.helpers.json.val(colors, 'data.colors');

    for(const a in clr){
        for(const b in clr[a].types){
            let bn = parseInt(b);
            if(bn <= 9){
                bn = `${a}0${b}`;
            }else{ 
                bn = `${a}${b}`;
            }

            for(const c in clr[a].types[b].shades){
                let cn = parseInt(c);
                if(cn <= 9){
                    cn = `${bn}0${c}`;
                }else{ 
                    cn = `${bn}${c}`;
                }

                clr[a].types[b].shades[c].vname = `c${cn}`;
            }
        }
    }

    colors.data.colors = clr;

    return colors;
}

const routeAction = async (req, res, next) => {
    colors = codes(colors, req, res, next);
    req.helpers.express.response.send('json', colors, 200, req, res, next);
}

exports.routeAction = routeAction;