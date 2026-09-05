export default {
  setGtmModule(cate: any, arg: any) {
    let page = _val(arg, 'router.view.page');

    if (arg && arg.isWidget) {
      let p = _val(arg, 'widget.page');
      page = p ? p : page;
    }

    _siteProps_.gtmModule = window[_CN].json.merge(_siteProps_.gtmModule ? _siteProps_.gtmModule : {}, {
      page: page,
      category: cate,
    });
  },

  module(props: any, module: any, catName: any) {
    let category: any = false;
    let map: any = {
      booking: 'flight',
      service: 'flightServices',
      bookingV2: 'flight',
    };

    if (catName) {
      category = catName;
    } else {
      if (props && props.isWidget) {
        category = _val(props, 'widget.category');
      } else {
        let fresh = _val(props, 'router.stage.fresh');

        if (fresh) {
          category = _val(props, 'router.view.category');
        }
      }
    }

    if (category) {
      if (map[category]) {
        category = map[category];
      }

      window[_CN].module.extend(category, module ? module : {});

      this.setGtmModule(category, props);
    }
  },

  bind(props: any, module: any, catName: any) {
    this.module(props, module, catName);
  },
};
