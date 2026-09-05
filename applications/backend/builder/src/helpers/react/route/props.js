
const getPath = (arg) => {
    let rval = {
        pIndex:{},
        path:{
            base:'',
            params:''
        }
    };
    let path = arg.path.split('/:');
        rval.path.base = path[0];
        rval.path.params = path[0];

    if(path.length > 1){
        path.splice(0, 1);
        for(let a in path){
            rval.pIndex[a] = (path[a].replace(/\?/g, ''));
            rval.path.params = (rval.path.params+`/#P${a}P#`);
        }
    }else{
        rval.params = false;
    }

    return rval;
}

const getStage = (route, comp) => {
    let rval = comp.stage;
    let cp = window[_CN].json.val(comp, 'prop.page');
    let pp = window[_CN].json.val(_siteProps_, 'router.view.page');

    if(!window.modules){
        rval.fresh = true;
    }

    rval.pageChanged = (cp != pp)

    return rval;
}

const get = (route, comp) => {
    window._siteProps_ = window._siteProps_ || {};
    window._siteProps_.router = {
        view:comp.prop,
        params:route.match.params,
        query:window[_CN].url.getParams(),
        //stage:getStage(route, comp),
        route:getPath(route.match)
    }

    return window._siteProps_.router;
}

exports.get = get;
exports.getStage = getStage;