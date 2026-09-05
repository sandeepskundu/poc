const auth = process.aioBeLibs('helpers/_private/auth');
const session = process.aioBeLibs('helpers/_private/session');
const scss = process.aioBeLibs('helpers/devops/builder/app/controllers/frontend/scss/schema/theme/base');

module.exports = async (req, res, next) => {
    const ad = await session.details(req);

    if((ad && ad.login === 1) || (1 === 1)){
        let colors = req.helpers.json.get(scss, 'base.data.color', {})
        let clr = req.helpers.json.val(scss, 'base.data.color.data.colors');

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

        return await req.helpers.express.response.getRespByCode(200, req, res, next, {
            data:colors.data
        });
    }else{
        return await req.helpers.json.val(auth, 'constants.RESPONSES.ERRORS.ACCOUNT_NOT_AUTHORIZED')
    }
}