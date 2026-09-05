const update = {
  query(arg?: any, nopush?: any) {
    let query = window[_CN].url.getParams();

    query = window[_CN].json.merge(query, arg ? arg : {});
    query = window[_CN].url.serailize(query);

    if (nopush) {
      return query;
    } else {
      let route = window[_CN].react.route;
      let path = route.param.mergeWithPath({});
      route.action.change.path(path, query);
    }
  },

  param(arg?: any, nopush?: any) {
    let route = window[_CN].react.route;
    let path = route.param.mergeWithPath(arg);

    if (nopush) {
      return path;
    } else {
      let query = window[_CN].url.getParams();
      query = window[_CN].url.serailize(query);
      route.action.change.path(path, query);
    }
  },

  props(arg?: any) {
    if (arg) {
      let route = window[_CN].react.route;
      let path = this.param(arg.params, true);
      let query = this.query(arg.query, true);
      route.action.change.path(path, query, false, arg?.historyReplace);
    }
  },
};

export default update;
