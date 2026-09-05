const reset = {

    query(){
        let route = window[_CN].react.route;
        let url = route.param.mergeWithPath();
            route.action.change.path(url);
    },

    props(){
        let route = window[_CN].react.route;
        let params = route.param.refresh();
        let url = route.param.mergeWithPath(params);
            route.action.change.path(url);
    },

    params(){
        let route = window[_CN].react.route;
        let params = route.param.refresh();
            route.action.update.param(params);
    }
}

export default reset;