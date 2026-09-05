import {default as helperUiStore} from "./../../../store";

const rState = {
  config: {
    storeKey: 'state',
    dsName: 'adlstate',
    deName: 'stateManager',
  },

  states: {},

  key(name: any) {
    let n = name ? name : this.config.deName;
    if (n) {
      let key: any = [];
      let page = _val(_siteProps_, 'router.view.page');
      key.push(page);
      key.push(n);
      const keyString:any = helperUiStore.keyMaker(key);
      return keyString;
    }

    return false;
  },

  clean() {
    let rv: any = {};
    let page = _val(_siteProps_, 'router.view.page');
    let storeKey = _val(this, 'config.storeKey');
    let d = helpers.storage.session.get(storeKey);

    if (d) {
      for (let a in d) {
        if (a === page) {
          rv[a] = d[a];
        }
      }
    }

    let dl = helpers.json.length(rv);
    helpers.storage.session.delete(storeKey);

    if (dl > 0) {
      helpers.storage.session.set(storeKey, rv);
    }
  },

  bind(cb: any, name: any, state: any) {
    this.clean();
    let that: any = this;
    if (typeof cb === 'function') {
      let key = this.key(name);
      let keyName = state ? state : that.config.dsName;
      let page = _val(_siteProps_, 'router.view.page');
      if (key && !that[key]) {
        that.states = helpers.json.set(that.states, key, {
          cb: cb,
          key: keyName,
          map: page,
        });
      }
    }
  },

  val(val: any, name: any) {
    return this.enum([val], name);
  },

  enum(enms?: any, name?: any) {
    let rval = false;

    if (enms && enms.length > 0) {
      let keyName = name ? name : this.config.dsName;
      let storeKey = _val(this, 'config.storeKey');
      let d = helpers.storage.session.get(storeKey);
      let page = _val(_siteProps_, 'router.view.page');
      let pop = _val(d, `${page}.${keyName}`);
      if (pop && enms.indexOf(pop) > -1) {
        return true;
      }
    }

    return rval;
  },

  toggle(show: any, arg: any, noRefresh: any) {
    let v = show ? show : '';

    let m = arg.map + '.' + arg.key;
    let storeKey = _val(this, 'config.storeKey');
    let d = helpers.storage.session.get(storeKey);
    d = helpers.json.set(d, m, v, false, true);
    helpers.storage.session.set(storeKey, d);

    if (!noRefresh) {
      arg.cb(false, false);
    }
  },

  flush(show: any, name: any, state: any) {
    this.set(show, name, state, true);
  },

  set(show: any, name: any, state: any, noRefresh: any) {
    let that: any = this;
    let key = this.key(name);
    let conf = _val(this, `states.${key}`);
    if (conf && conf.key && typeof conf.cb === 'function') {
      conf.key = state ? state : conf.key;
      that.toggle(show, conf, noRefresh);
    }
  },
};

export default rState;
