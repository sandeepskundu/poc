import { default as helperUiStore } from './../../../store';

export default {
  key(name: any) {
    if (name) {
      let key: any = [];
      let cate = _val(_siteProps_, 'flow.category.name');
      key.push(cate);
      key.push(name);
      const keyString: any = helperUiStore.keyMaker(key);
      return keyString;
    }

    return false;
  },

  eventBus(e: any) {
    let arg = _val(e, 'details.arg');
    let name = _val(e, 'details.key');
    let cb = _val(e, 'details.callback');

    if (typeof name === 'string' && typeof cb === 'function') {
      cb(arg, name);
    }
  },

  setEvent(name: any, arg: any) {
    let that: any = this;
    this.set(name, arg);
    if (name) {
      helpers.react.eventBus.remove(name, that.eventBus);
      helpers.react.eventBus.on(name, that.eventBus);
    }
  },

  eventByName(name: any, arg: any) {
    let that: any = this;
    let key = that.key(name);
    if (key && that[key]) {
      helpers.react.eventBus.dispatch(name, {
        details: {
          arg: arg,
          key: key,
          callback: that[key],
        },
      });
    }
  },

  set(name: any, arg: any, removeOlder: any) {
    let that: any = this;
    if (typeof name === 'string' && typeof arg === 'function') {
      let key = this.key(name);
      if (key && (!that[key] || removeOlder)) {
        that[key] = arg;
      }
    }
  },

  do(name: any, arg: any) {
    let that: any = this;
    let key = that.key(name);
    if (key && that[key]) {
      that[key](false, arg, key);
    }
  },
};
