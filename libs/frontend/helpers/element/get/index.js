const byId = (a) => {
    if(a){
        const elm = document.getElementById(a);
        if(elm){
            return elm;
        }
    }
    return false;
}

const height = (elm) => {
    if(elm){
        return elm.offsetHeight;
    }
    return 0;
}

const scrollToChild = (pId, cId, from) => {
    let diff = 0;
    let elm = byId(pId);
    let cElm = offsetObj(cId);
    let pElm = offsetObj(pId);
    
    if(from === 'left'){
        diff = (cElm.left-pElm.left);
    }else{
        diff = (cElm.top-pElm.top);
    }

    if(diff && elm){
        scrollTo(elm, 'left', diff)
    }
}

const offsetObj = (id) => {
    let elm = byId(id);
    let rect = elm.getBoundingClientRect();

    if(elm){
        return {
            top:rect.top+window.scrollY,
            left:rect.left+window.scrollX,
        };
    }else{
        return {
            top:0,
            left:0
        }
    }
}

const offsetByElement = (ele) => {
    let curEle 
    if(ele){
        curEle = ele.currentTarget
        curEle = curEle.getBoundingClientRect()
    }else{
        curEle = {
            bottom: 50,
            height: 20,
            left: 50,
            right: 50,
            top: 50,
            width: 50,
            x: 50,
            y: 50
        }
    }

    return curEle
};

const offset = (elm, from) => {
    if(typeof elm === 'string'){
        elm = byId(elm);
    };

    if(elm){
        if(from !== 'left'){
            return elm.offsetTop;
        }
    }
    return 0;
};

const scrollTo = (elm, from, px) => {
    let val = (px?px:0)
    if(elm){
        if(from === 'left'){
            elm.scrollLeft = Math.round(val);
        } else{
            elm.scrollTop = Math.round(val);
        }
    }
};

const scroll = (elm, from) => {
    if(elm){
        if(from !== 'left'){
            return elm.offsetTop;
        }
    }
};

const allParents = (e) => {
    let rval = [];

    if(e && e.target){
        const ap = (a) => {
            while (a) {
                rval.unshift(a);
                a = a.parentNode;
            }
        }
        ap(e.target);
    }

    return rval;
}

const byAttr = (attr, elm) => {
    if(attr){

        if(elm && elm.querySelectorAll){
            return elm.querySelectorAll(`[${attr}]`);
        }

        return document.querySelectorAll(`[${attr}]`);
    }else{
        return [];
    }
}

const comp = (n, active) => {
    if(n){
        if(active){
            return document.querySelectorAll(`[data-comp="${n}"][data-binded-${n}="yes"]`);
        }else{
            return document.querySelectorAll(`[data-comp="${n}"]:not([data-binded-${n}="yes"])`);
        }
    }else{
        return [];
    }
}

exports.byId = byId;
exports.comp = comp;
exports.byAttr = byAttr;
exports.height = height;
exports.scroll = scroll;
exports.offset = offset;
exports.scrollTo = scrollTo;
exports.offsetObj = offsetObj;
exports.allParents = allParents;
exports.scrollToChild = scrollToChild;
exports.offsetByElement = offsetByElement;