export default {
  toggle(el: any, add: any) {
    let elm = el ? el : document.body;
    if (add) {
      window[_CN].element.class.add(elm, 'oh');
    } else {
      window[_CN].element.class.remove(elm, 'oh');
    }
  },

  getCoords(elem: any) {
    // crossbrowser version
    let box = elem.getBoundingClientRect();
    let body = document.body;
    let docEl = document.documentElement;
    let scrollTop = window.scrollY || docEl.scrollTop || body.scrollTop;
    let scrollLeft = window.scrollX || docEl.scrollLeft || body.scrollLeft;
    let clientTop = docEl.clientTop || body.clientTop || 0;
    let clientLeft = docEl.clientLeft || body.clientLeft || 0;
    let top = box.top + scrollTop - clientTop;
    let left = box.left + scrollLeft - clientLeft;

    return {
      top: Math.round(top),
      left: Math.round(left),
    };
  },
  getTop(cords: any, buffer: any, top: any) {
    if (cords && cords.top) {
      if (buffer && cords.top > buffer) {
        top = cords.top - buffer;
      } else {
        top = cords.top;
      }
    }
    return top;
  },
  toElement(id: any, buffer: any, smooth: boolean = true) {
    if (id) {
      let elm = window[_CN].element.get.byId(id);
      if (elm) {
        let top = 0;
        let cords = this.getCoords(elm);
        top = this.getTop(cords, buffer, top);
        setTimeout(() => {
          window.scroll({
            top: top,
            behavior: smooth ? 'smooth' : 'auto',
          });
        }, 2);
      }
    }
  },

  scrollTop(elm: any, to: any, behavior?: any) {
    if (elm) {
      if (elm.scrollTop) {
        elm.scrollTop = to ? to : 0;
      }
    } else {
      window.scrollTo({ top: to || 0, behavior: behavior || 'smooth' });
    }
  },

  byId(id: any, type: any, to: any) {
    if (id) {
      let elm = document.getElementById(id);
      if (elm) {
        switch (type) {
          case 'left':
            // code block
            break;
          case 'top':
            this.scrollTop(elm, to);
            break;
          default:
          // code block
        }
      }
    }
  },

  toFocus(id: any, buffer: any = 150) {
    let desktop = helpers.ua.is('desktop');

    if (desktop) {
      this.toElement(id, buffer);
    }
  },
};
