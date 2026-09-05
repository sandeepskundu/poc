const mapPath = (prefix, p) => {
    let path = prefix;

    if(p){
        path = (path+'/'+p);
    }

    return path;
}

const doMap = (rval, cate, arg, view) => {
    for(let a in arg){
        if(a != 'childs'){
            let p = mapPath(cate, a);
            let item = window[_CN].json.copy(arg[a]);
                item.category = cate;
                item.device = view;
                rval[p] = item;
        }else{
            for(let b in arg.childs){
                let p = mapPath(cate, b);
                let item = window[_CN].json.copy(arg.childs[b]);
                    item.device = view;
                    item.category = cate;
                    rval[p] = item;
            }
        }
    }
    return rval;
}

const getCategory = (arg) => {
    let map = {};
    let view = window[_CN].ua.getView();
    for(let a in arg){
        let item = arg[a];
        if(item){
            let route = (item.desktop?item.desktop:{});
            let vr = (item[view]?item[view]:{});
                vr = doMap({}, a, vr, view);
                map = doMap(map, a, route, 'desktop');
                map = window[_CN].json.merge(map, vr);
        }
    }

    return map;
}

const getPath = (arg) => {
    let path = [];
    let flow = _siteProps_.flow;
        path.push(_siteProps_.appProps.pathPrefix);

    if(flow){
        if(flow.language && flow.language.mapped){
            path.push(flow.language.name)
        }

        if(flow.bundle && flow.bundle.mapped){
            path.push(flow.bundle.name)
        }
    }

    path.push(arg.category);

    if(arg.path){
        path.push(arg.path);
    }

    path = path.join('/');

    return path.replace(/\/\/+/g, '/');
}

const getViewPath = (arg) => {
    let path = ['.'];
        path.push(arg.category);
        path.push('views');
        path.push(arg.device);
        path.push(arg.view);
        path.push('index.jsx');
        path = path.join('/')

    return path.replace(/\/\/+/g, '/');
}

const getConf = (arg) => {
    return {
        page:(arg.name),
        view:(arg.device),
        category:(arg.category)
    }
}

const getParamsMap = (arg) => {
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

const stage = () => {
    let rval = {
        fresh:false,
        pageChanged:true
    };

    if(!window.modules){
        rval.fresh = true;
    }

    return rval;
}   

const parseRoute = (rval, arg) => {
    let item = {
        prop:getConf(arg),
        path:getPath(arg),
        view:getViewPath(arg)
    };

    item.stage = stage();
    item.route = getParamsMap(item);
    window[_CN].constants.route.set(item);

    rval.push(item);

    return rval;
}

const getRouteMap = (arg) => {
    let rval = [];

    for(let a in arg){
        rval = parseRoute(rval, arg[a]);
    };

    return rval;
}

const init = (arg) => {
    let route = getCategory(arg);
    return getRouteMap(route);
}

exports.init = init;
exports.stage = stage;
exports.doMap = doMap;
exports.mapPath = mapPath;
exports.getConf = getConf;
exports.getPath = getPath;
exports.getCategory = getCategory;
exports.parseRoute = parseRoute;
exports.getViewPath = getViewPath;
exports.getRouteMap = getRouteMap;
exports.getParamsMap = getParamsMap;