const eventBus = {
  cbs: {},
  on(event: any, callback: any) {
    let that: any = this;
    that.cbs[event] = callback;
    document.addEventListener(event, that.cbs[event]);
  },

  dispatch(event: any, data: any) {
    let ev: any = new CustomEvent(event, { detail: data });
    ev.details = ev.details || {};
    ev.details = data.details || data;

    document.dispatchEvent(ev);
  },

  remove(event: any, callback: any) {
    let that: any = this;
    document.removeEventListener(event, that.cbs[event]);
  },
};

export default eventBus;
