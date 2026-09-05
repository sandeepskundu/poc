const indentifier = 'accordion';

const toggleTheme = (id, stages, h, active) => {
    let elm = h.json.get(h.element.get.byAttr(id), '0', false);

    if(elm){
        let def = h.json.get(stages, 'default', '');
        let sel = h.json.get(stages, 'selected', '');

        if(active){
            h.element.class.add(elm, sel);
            h.element.class.remove(elm, def);
        }else{
            h.element.class.add(elm, def);
            h.element.class.remove(elm, sel)
        }
    }
}

const switchTheme = (arg, h, active) => {
    let rval = {};
    let id = h.json.get(arg, 'item.iconId', '');
    let theme = h.json.get(arg, 'parent.theme', {});

    for(let a in theme){
        for(let b in theme[a]){
            if(theme[a]){
                for(let c in theme[a][b]){
                    let v = helpers.json.get(theme, `${a}.${b}.${c}`, {});

                    if(v && h.data.type.is(v, 'object')){
                        let attrs = h.element.jsx.attrs({ds:{predefined:v}})
                        let cls = h.json.get(attrs, 'className', '');

                        if(cls){
                            let map = `data-accordion-${a}-${c}=${id}`;
                                rval[map] = rval[map] || {};
                                rval[map][b] = cls;
                        }
                    }
                }
            }
        }
    }

    for(let a in rval){
        toggleTheme(a, rval[a], h, active);
    }
}

const getAllHeadings = (elm, h) => {
    let id = h.element.attr.get(elm, 'data-accordion-id');

    if(id){
        return h.element.get.byAttr(`data-accordion-toggle=${id}`);
    }else{
        return [];
    }
}

const getJsonConfig = (elm, h, attr) => {
    return helpers.element.attr.stringToObj(elm, attr) || {};
}

const setJsonConfig = (elm, h, attr, arg) => {
    h.element.attr.set(elm, attr, JSON.stringify(arg || {}));
}

const toggleConfig = (elm, h, attr, type, arg) => {
    if(type === 'get' || !type){
        return getJsonConfig(elm, h, attr)
    }

    if(type === 'set' && arg){
        setJsonConfig(elm, h, attr, arg)
    }
}

const toggleParentConfig = (elm, h, type, arg) => {
    let attr = 'data-accordion-config';

    if(!type){
        return toggleConfig(elm, h, attr, 'get')
    }

    toggleConfig(elm, h, attr, 'set', arg);
}

const toggleItemConfig = (elm, h, type, arg) => {
    let attr = 'data-accordion-details';

    if(!type){
        return toggleConfig(elm, h, attr, 'get')
    }

    toggleConfig(elm, h, attr, 'set', arg);
}

const getParentElem = (arg, e, h) => {
    let pId = h.json.get(arg, 'compId', '');
    let elm = h.element.get.byAttr(`data-accordion-id=${pId}`);

    return h.json.get(elm, '0', null);
}

const parentConfig = (arg, e, h) => {
    let rval = {};
    let elm = getParentElem(arg, e, h);
    
    if(elm){
        rval = toggleParentConfig(elm, h);
    }

    return rval;
}

const getConfigs = (e, h) => {
    let iConf = toggleItemConfig(e.currentTarget, h);
    return {
        item:iConf,
        parent:parentConfig(iConf, e, h)
    }
}

const getHeader = (arg, h) => {
    let id = h.json.get(arg, 'headerId', '');

    if(id){
        return h.json.get(h.element.get.byAttr(`data-accordion-header-wrapper=${id}`), '0', false);
    }else{
        return false;
    }
}

const closeAllChilds = (pElm, h) => {
    let heads = getAllHeadings(pElm, h);
    if(heads && heads.length > 0){
        heads.forEach(head => {
            let elm = {...head, ...{currentTarget:head}};
            let conf = getConfigs(elm, h);
            if(!h.json.get(conf, 'item.disabled', false)){
                let item = h.json.get(conf, 'item', {});
                    h.element.class.remove(getHeader(item, h), 'active')
                    item.active = false;
                    toggleIcon(elm, h, item);
                    switchTheme(conf, h, false);
            }
        });
    };
}

const allCallNestedAccording = (pElm, h) => {
    let childs = h.element.get.byAttr(`data-comp="${indentifier}"`, pElm);
    if(childs && childs.length > 0){
        childs.forEach(child => {
            closeAllChilds(child, h);
        })
    }
}

const closeAll = (e, h, arg) => {
    let pElm = getParentElem(arg.item, e, h);
    let multi = h.json.get(arg, 'parent.multiple', false);

    if(pElm){
        if(!multi){
            closeAllChilds(pElm, h);
        }
        allCallNestedAccording(pElm, h)
    }
}

const toggleIcon = (e, h, arg) => {
    let id = h.json.get(arg, 'iconId', '');
    let ico = h.element.get.byId(id);

    if(ico){
        let icoConf = getJsonConfig(ico, h, 'data-icon-conf');
        let conf = getJsonConfig(ico, h, 'data-accordion-icon');
        let type = h.json.get(icoConf, 'type', 'font');
        let family = h.json.get(icoConf, 'family', 'g');

        if(type === 'font' && family){
            let defIco = `ico-${family}-${h.json.get(conf, 'icons.default', '')}`;
            let selIco = `ico-${family}-${h.json.get(conf, 'icons.selected', '')}`;
            if(arg.active){
                h.element.class.add(ico, selIco);
                h.element.class.remove(ico, defIco);
            }else{
                h.element.class.add(ico, defIco);
                h.element.class.remove(ico, selIco);
            }
        }
    }
}

const toggleActive = (e, h, arg, active) => {
    let item = h.json.get(arg, 'item', {});
        item.active = !active;
        
        if(active){
            h.element.class.remove(getHeader(item, h), 'active');
        }else{
            h.element.class.add(getHeader(item, h), 'active');
        };

        toggleIcon(e, h, item);
        switchTheme(arg, h, !active);
}

const control = (e, h) => {
    let conf = getConfigs(e, h);
    if(!h.json.get(conf, 'item.disabled', false)){
        let active = h.element.class.has(getHeader(conf.item, h), 'active')
            closeAll(e, h, conf);
            toggleActive(e, h, conf, active);
    }
}

const heading = (elm, h) => {
    elm.addEventListener('click', (e) => {
        control(e, h);
    });
}

const bind = (h) => {
    h.inital.components.compile(h, indentifier, (elm) => {
        let heads = getAllHeadings(elm, h);
        if(heads && heads.length > 0){
            heads.forEach(head => {
                heading(head, h);
            });
        }
    });
}

exports.bind = bind;