const elmH = require('./../../element');

const hd = {
    configs:{
        display:{
            class:'hd-show',
            attrs:{
                parent:'data-comp-hd',
                target:'data-comp-hd-target'
            }
        },
        hide:{
            class:'hh-hide',
            attrs:{
                parent:'data-comp-hh',
                target:'data-comp-hh-target'
            }
        },
    },

    switch:(e, show, dCls, pAttr, tAttr) => {
        let elm = e.target.closest(`[${pAttr}]`);

        if (!elm) {
            return
        }else{
            let key = elmH.attr.get(elm, pAttr);

            if(key){
                elm.querySelectorAll(`[${tAttr}="${key}"]`).forEach((el) => {
                    if(show){
                        elmH.class.add(el, dCls);
                    }else{
                        elmH.class.remove(el, dCls);
                    }
                })
            }
        }
    },

    control:(e, show) => {
        hd.switch(e, show, hd.configs.hide.class, hd.configs.hide.attrs.parent, hd.configs.hide.attrs.target);
        hd.switch(e, show, hd.configs.display.class, hd.configs.display.attrs.parent, hd.configs.display.attrs.target);
    },

    mouseover:(e) => {
        hd.control(e, true);
    },

    mouseout:(e) => {
        hd.control(e, false)
    },

    listeners:() => {
        document.addEventListener('focusin', hd.mouseout, true);
        document.addEventListener('focusout', hd.mouseout, true);
        document.addEventListener("mouseout", hd.mouseout, true);
        document.addEventListener("mouseover", hd.mouseover, true);
    },

    dli:() => {
        document.removeEventListener('focusin', hd.mouseout, true);
        document.removeEventListener('focusout', hd.mouseout, true);
        document.removeEventListener("mouseout", hd.mouseout, true);
        document.removeEventListener("mouseover", hd.mouseover, true);
    },

    bind:() => {
        hd.dli();
        hd.listeners()
    }
}

module.exports = hd;