const get = require('./../get');

const setAtr = () => {
    return ['s', 'e', 't', 'A', 't', 't', 'r', 'i', 'b', 'u', 't', 'e'].join('');
}


const multiple = (elm, cls, type) => {
    if(typeof cls === 'string'){
        let li = cls.split(' ');

        if(li && li.length > 1){
            for(let a in li){
                let cl = li[a];
                if(cl){
                    if(type === 'add'){
                        add(elm, cl);
                    }

                    if(type === 'remove'){
                        remove(elm, cl);
                    }
                }
            };
            return true;
        }
    }

    return false;
}

const add = (el, cls) => {
    if(typeof el === 'string'){
        el = get.byId(el);
    }

    if(el){
        if(!multiple(el, cls, 'add')){
            let sa = setAtr();
            let hasCls = has(el, cls);

            if(!hasCls){
                if(el.classList.value){
                    let clses = el.classList.value;
                        el.classList.value = clses+' '+cls;
                }else{
                    let	clsList =	el.getAttribute('class');
                    if(clsList){
                        clsList = clsList.split(' ');
                    }else{
                        clsList = []
                    }
                    clsList.push(cls);
                    el[sa]('class', clsList.join(' '));
                }
            }
        }
    }
}

const remove = (elm, cls) => {
    if(typeof elm === 'string'){
        elm = get.byId(elm);
    }

    if(elm){
        if(!multiple(elm, cls, 'remove')){
            let sa = setAtr();
            let clss = elm.classList.value;
            if(!clss){
                clss = elm.getAttribute('class');
            };

            if(clss){
                clss = clss.split(' ');
                let clsI = clss.indexOf(cls);
                if(clsI >= 0){
                    clss.splice(clsI, 1);
                    clss = clss.join(' ');	
                    elm[sa]('class', clss);
                    remove(elm, cls);
                };
            }
        }  
    }
}

const has = (elm, cls) => {
    let clsList = []

    if(typeof elm === 'string'){
        elm = get.byId(elm);
    }
    
    if(elm && elm.classList){
        clsList =	elm.getAttribute('class');
        if(clsList){
            clsList = clsList.split(' ');
        }
    };
    if(clsList && clsList.indexOf(cls) > -1){
        return true;
    };
    return false;
}

const toggle = (elm, cls) => {
    let hasClass = has(elm, cls);
    if(hasClass){
        remove(elm, cls);
    }else{
        add(elm, cls)
    }
}

exports.has = has;
exports.add = add;
exports.remove = remove;
exports.toggle = toggle;