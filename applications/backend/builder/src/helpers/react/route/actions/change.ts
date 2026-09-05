const change = {
  path(path?: any, query?: any, get?: any, historyReplace?: any) {
    if (path) {
      if (query && typeof query === 'string') {
        query = query.replace(/\?/g, '');
        path = path + '?' + query;
      } else {
        path = path.replace(/\?/g, '');
      }

      path = helpers.url.mergeCommonParams(path);

      if (get) {
        return path;
      } else {
        if (historyReplace) {
          window.history.replaceState({}, '', path);
        } else {
          window[_CN].react.route.history.push(path);
        }
      }
    }

    return path;
  },
  getPath(path: any, route: any, arg: any) {
    let igVal = window[_CN].react.route.param.getIgnoreVal();
    let query = _val(arg, 'query');
    let params = _val(arg, 'params');

    if (path) {
      let pIndex = _val(route, 'route.pIndex');

      for (let a in pIndex) {
        let v = _val(params, pIndex[a]);

        if (!v) {
          v = igVal;
        }

        path = window[_CN].string.replace.word(path, `#P${a}P#`, v);
      }

      if (query) {
        let qp = window[_CN].url.serailize(query);
        path = path + '?' + qp;
      }
    }
    return path;
  },

  page(arg?: any, page?: any, c?: any, refresh?: any, get?: any) {
    if (page) {
      let cate = _val(_siteProps_, 'router.view.category');

      if (c) {
        cate = c;
      }
      let route = _val(_constants, `routes.${cate}.${page}`);
      let path = _val(route, 'route.path.params');
          path = this.getPath(path, route, arg);

      if (refresh) {
        let url = this.path('/' + path, refresh);
        
        window[_CN].url.change(url);
      } else {
        return this.path('/' + path, false, get);
      }
    }
  },
};

export default change;
