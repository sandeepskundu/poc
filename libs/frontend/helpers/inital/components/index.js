const popover = require('./popover');
const readmore = require('./readmore');
const accordion = require('./accordion');
const slideDrawer = require('./slide-drawer');

const compile = (h, name, cb) => {
    if(h && name){
        let elms = h.element.get.comp(name);
        if(elms && elms.length > 0){
            elms.forEach(elm => {
                if(cb){
                    cb(elm);
                }
                h.element.attr.binded(elm, name);
            });
        };
    }
}

const handler = (e, h) => {
    popover.close(e, h);
}

const docClick = (h) => {
    const onClick = (e) => {handler(e, h)};
    document.removeEventListener("click", onClick);
    document.addEventListener("click", onClick);
}

const bind = (h) => {
    popover.bind(h);
    readmore.bind(h);
    accordion.bind(h);
    slideDrawer.bind(h);
    docClick(h);
}

exports.bind = bind;
exports.compile = compile;