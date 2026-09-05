const bind = (h) => {
    h.inital.components.compile(h, 'readmore', (elm) => {
        let cls = 'rd-mor-unclmp';
        let islc = h.element.is.lineClamped(elm);

        if(islc){
            h.element.class.remove(elm, cls)
        }else{
            h.element.class.add(elm, cls);
        }
    });
}

exports.bind = bind;