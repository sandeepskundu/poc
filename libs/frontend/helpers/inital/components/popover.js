const indentifier = 'popover';

const getTriggers = (wrpr, h) => {
    return wrpr.querySelectorAll(`[data-comp-elm="popover-toggle"]`);
}

const getWrapper = (id, h) => {
    return document.querySelectorAll(`[data-comp="${indentifier}"][data-comp-id="${id}"]`);
}

const getActive = (h) => {
    return document.querySelectorAll(`[data-comp="popover"][data-popover-state="opened"]`)
}

const setStates = (rId, active, h) => {
    let wrprs = getWrapper(rId, h);
    if(wrprs && wrprs.length > 0){
        wrprs.forEach(elm => {
            if(active){
                h.element.attr.set(elm, 'data-popover-state', 'opened')
            }else{
                h.element.attr.remove(elm, 'data-popover-state')
            }
        });
    }
}

const closeOpend = (elm, h) => {
    let rId = h.element.attr.get(elm, 'data-comp-id');
    let wrprs = getWrapper(rId, h);
    if(wrprs && wrprs.length > 0){
        wrprs.forEach(elm => {
            let trgrs = getTriggers(elm, h);
                trgrs.forEach(trgr => {
                    trgr.checked = false;
                });
        });
    }

    if(rId){
        setStates(rId, false, h);
    }
}

const inputChange = (elm, h) => {
    const onChange = (e) => {
        let rId = h.element.attr.get(e.target, 'data-comp-rId');
        let checked = h.json.get(e, 'target.checked', false);
            setStates(rId, checked, h);
    }

    elm.removeEventListener("change", onChange);
    elm.addEventListener("change", onChange);
}

const bind = (h) => {
    h.inital.components.compile(h, indentifier, (elm) => {
        let obc = h.element.class.has(elm, 'ow-click');
        let isReact = h.element.class.has(elm, 'ra-react');

        if(obc && !isReact){
            let elms = getTriggers(elm, h);
            if(elms && elms.length > 0){
                elms.forEach(elm => {
                    inputChange(elm, h);
                });
            }
        }
    });
}

const close = (e, h) => {
    let elms = getActive(h);
    if(elms && elms.length > 0){
        console.log(elms, elms);
        elms.forEach(elm => {
            if (!elm.contains(e.target)) {
                closeOpend(elm, h);
            }else{
                //
            }
        });
    }
}

exports.bind = bind;
exports.close = close;