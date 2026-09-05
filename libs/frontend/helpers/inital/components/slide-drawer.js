const indentifier = 'slide-drawer';
const drawerId = 'data-slide-drawer-id';
const drawerToggle = 'data-slide-drawer-link';

const toggle = (dId, h) => {
    let parentElm = h.element.get.byAttr(`data-slide-drawer-wrapper=${dId}`);
        parentElm = h.json.get(parentElm, '0', null);

    if(parentElm){
        if(h.element.class.has(parentElm, 'active')){
            h.element.class.remove(parentElm, 'active');
            h.element.class.remove(document.body, 'oh');
        }else{
            h.element.class.add(parentElm, 'active');
            h.element.class.add(document.body, 'oh');
        }
    }
}

const control = (e, h) => {
    toggle(h.element.attr.get(e.currentTarget, drawerId), h);
}

const opener = (elm, h) => {
    let id = h.element.attr.get(elm, drawerId);
    if(id){
        let list = document.querySelectorAll(`[data-slide-drawer-link="${id}"]:not([data-binded-${indentifier}="yes"])`);
        if(list && list.length > 0){
            list.forEach(openElm => {
                h.element.attr.binded(openElm, indentifier);
                openElm.addEventListener('click', (e) => {
                    let pId = h.element.attr.get(e.currentTarget, 'data-slide-drawer-link');
                    if(pId){
                        toggle(pId, h);
                    }
                });
            });
        }
    }
    
}

const closers = (elm, h) => {
    elm.addEventListener('click', (e) => {
        control(e, h);
    });
}

const bind = (h) => {
    h.inital.components.compile(h, indentifier, (elm) => {
        if(elm && h.element.attr.get(elm, drawerId)){
            opener(elm, h);
            closers(elm, h);
        }
    });
}

exports.bind = bind;