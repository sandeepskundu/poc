const json = require('./../../json');
const dtype = require('./../../data');
const elmH = require('./../../element');

const tooltip = {
    configs:{
        offset:10,
        padding:10,
        showDelay:0,
        hideDelay:0,
        trigger:"both", // "hover|focus|both"
        attributes:{
            ds:'data-tip-ds',
            color:'data-tip-color',
            tooltip:'data-tip-html',
            trigger:'data-tip-tigger',
            position:'data-tip-position',
            background:'data-tip-background'
        },
        position:{
            default:'top',
            enums:{
                top:true,
                left:true,
                right:true,
                bottom:true
            },
            opposite:{
                top:'bottom',
                left:'right',
                right:'left',
                bottom:'top'
            },
            perpendiculars:{
                top:['right', 'left'],
                left:['top', 'bottom'],
                right:['top', 'bottom'],
                bottom:['right', 'left']
            }
        },
        ds:{
            overwrite:{
                ds:{
                    theme:null,
                    css:{
                        others:'',
                        class:{
                            border:null,
                            margin:null,
                            padding:null,
                        },
                        flags:{
                            noBorder:false,
                            rounded:false,
                            disabled:false,
                            boxSizing:false,
                        }
                    }
                }
            },
            default:{
                ds:{
                    predefined:{
                        color:'c00000',
                        background:'c00001',
                    },
                    css:{
                        others:'',
                        class:{
                            shadow:'',
                            radius:{
                                1:8,
                                2:8
                            },
                            family:'',
                            border:null,
                            margin:null,
                            padding:null,
                            fontsize:'xs'
                        },
                        flags:{
                            rounded:false,
                            noBorder:false,
                            disabled:false,
                            boxSizing:false,
                        }
                    }
                }
            }
        }
    },

    state:{
        el:null,
        anchor:null,
        showTimer:null,
        hideTimer:null
    },

    isElm:(node) => {
        return node && node.nodeType === 1;
    },

    isInside:(e, target) => {
        return (tooltip.isElm(e.relatedTarget)?target.contains(e.relatedTarget):false);
    },

    clearTimers:() => {
        if(tooltip.state.showTimer){
            window.clearTimeout(tooltip.state.showTimer)
        };

        if(tooltip.state.hideTimer){
            window.clearTimeout(tooltip.state.hideTimer);
        };

        tooltip.state.showTimer = null;
        tooltip.state.hideTimer = null;
    },

    getElm:(target) => {
        if(!tooltip.isElm(target)){
            return null;
        }

        if(target.closest){
            return target.closest(`[${tooltip.configs.attributes.tooltip}]`)
        }

        return null;
    },

    setArrow:(rElm, pElm) => {
        return rElm;
    },

    wrapper:(elm) => {
        let rval = document.createElement("div");
            rval.className = 'tip anim fade-in';
        return tooltip.setArrow(rval, elm);
    },

    ds:(elm) => {
        let validds = false;
        let dds = json.get(tooltip, 'configs.ds.default', {});
        let ods = json.get(tooltip, 'configs.ds.overwrite', {});
        let tds = elmH.attr.get(elm, json.get(tooltip, 'configs.attributes.ds', ''));
        let color = elmH.attr.get(elm, json.get(tooltip, 'configs.attributes.color', ''));
        let bg = elmH.attr.get(elm, json.get(tooltip, 'configs.attributes.background', ''));

        if(tds){
            try {
                let ds = JSON.parse(tds);
                let isobj = dtype.type.is(ds, 'object');

                if(isobj && json.length(ds) > 0){
                    dds = json.merge(dds, ds);
                }
            } catch(error){}
        }

        if(color){
            dds = json.set(dds, 'ds.predefined.color', color);
        }

        if(bg){
            dds = json.set(dds, 'ds.predefined.background', bg);
        }
        
        return json.merge(dds, ods);
    },

    dsAttrs:(elm) => {
        return elmH.jsx.attrs(tooltip.ds(elm), 'tip-ctnt');
    },

    container:(elm) => {
        let attrs = tooltip.dsAttrs(elm);
        let rval = document.createElement("div");
            rval.className = json.get(attrs, 'className', json.get(attrs, 'classname', ''));
            delete attrs.className;
            delete attrs.classname;

            if(attrs){
                for(let a in attrs){
                    elmH.attr.set(rval, a, attrs[a]);
                }
            };
    
        return rval;
    },

    position:(elm) => {
        let pos = elm.getAttribute(tooltip.configs.attributes.position);
            
        if(pos && tooltip.configs.position.enums && tooltip.configs.position.enums[pos]){
            return pos;
        }else{
            return tooltip.configs.position.default;
        }
    },

    oppositePlacement:(plc) => {
        if(plc && tooltip.configs.position.opposite && tooltip.configs.position.opposite[plc]){
            return tooltip.configs.position.opposite[plc];
        }else{
            return 'left'
        }
    },

    candidatePlacements:(plc) => {
        return [plc, tooltip.oppositePlacement(plc)].concat(json.get(tooltip, `configs.position.perpendiculars.${plc}`, ['top', 'bottom']));
    },

    calculatePosition:(elmRect, tipRect, plc) => {
        let elmCenterX = elmRect.left + elmRect.width/2;
        let elmCenterY = elmRect.top + elmRect.height/2;
        let offset = json.get(tooltip, 'configs.offset', 10);

        if (plc === "top") {
            return {
                top: elmRect.top - tipRect.height - offset,
                left: elmCenterX - tipRect.width/2,
            };
        }

        if (plc === "bottom") {
            return {
                top: elmRect.bottom + offset,
                left: elmCenterX - tipRect.width/2,
            };
        }

        if (plc === "left") {
            return {
                top:elmCenterY - tipRect.height/2,
                left:elmRect.left - tipRect.width - offset,
            };
        }

        return {
            top:elmCenterY - tipRect.height/2,
            left:elmRect.right + offset,
        };
    },

    getPadding:() => {
        return json.get(tooltip, 'configs.padding', 10);
    },

    overflowAmount:(pos, rect) => {
        let vw = window.innerWidth;
        let vh = window.innerHeight;
        let padding = tooltip.getPadding();
        let overTop = Math.max(0, padding - pos.top);
        let overLeft = Math.max(0, padding - pos.left);
        let overBottom = Math.max(0, pos.top + rect.height - (vh - padding));
        let overRight = Math.max(0, pos.left + rect.width - (vw - padding));

        return overTop + overLeft + overBottom + overRight;
    },

    clampPosition(pos, rect) {
        let padding = tooltip.getPadding();
        let minTop = padding;
        let minLeft = padding;
        let maxTop = window.innerHeight - rect.height - padding;
        let maxLeft = window.innerWidth - rect.width - padding;

        return {
            top:Math.min(Math.max(pos.top, minTop), Math.max(minTop, maxTop)),
            left:Math.min(Math.max(pos.left, minLeft), Math.max(minLeft, maxLeft)),
        };
    },

    placement:(elmRect, tipRect, pos) => {
        let best = pos;
        let candidates = tooltip.candidatePlacements(pos);
        let bestPos = tooltip.calculatePosition(elmRect, tipRect, pos);
        let bestOverflow = tooltip.overflowAmount(bestPos, tipRect);

        for (let i in candidates) {
            let placement = candidates[i];
            let pos = tooltip.calculatePosition(elmRect, tipRect, placement);
            let overflow = tooltip.overflowAmount(pos, tipRect);

            if(overflow === 0){
                return {
                    top:pos.top,
                    left:pos.left,
                    placement:placement
                };
            }

            if(overflow < bestOverflow){
                bestPos = pos;
                best = placement;
                bestOverflow = overflow;
            }
        }

        return {
            placement:best,
            top:tooltip.clampPosition(bestPos, tipRect).top,
            left:tooltip.clampPosition(bestPos, tipRect).left
        };
    },

    arrow:(elm, tip) => {
        let ds = tooltip.ds(elm);
        let bg = json.get(ds, 'ds.predefined.background', '');

        if(bg){
            let styl = document.createElement("style");
                styl.textContent = `.tip-ctnt::before{border-color:var(--${bg}) !important}`;
                tip.appendChild(styl);
        }
    },

    render:(elm, text) => {
            tooltip.clearTimers();
            tooltip.remove();
        let pos = tooltip.position(elm);
        let tipElm = tooltip.wrapper(elm);
        let ctntElm = tooltip.container(elm);
            ctntElm.innerHTML = text;
            tipElm.appendChild(ctntElm);
            document.body.appendChild(tipElm);
            tooltip.arrow(elm, ctntElm);

        let elmRect = elm.getBoundingClientRect();
        let tipRect = tipElm.getBoundingClientRect();
        let bestPlacement = tooltip.placement(elmRect, tipRect, pos);
        let tipPos = 'tip-pos-'+bestPlacement.placement;
            elmH.class.add(tipElm, tipPos);
            elmH.class.add(ctntElm, tipPos);
            tipElm.style.opacity = 1;
            tipElm.style.top = bestPlacement.top+"px";
            tipElm.style.left = bestPlacement.left+"px";
            tooltip.state.el = tipElm;
            tooltip.state.anchor = elm;
    },

    show:(elm) => {
        let text = elm.getAttribute(tooltip.configs.attributes.tooltip);

        if(!text){
            return;
        }

        if(tooltip.state.anchor === elm && tooltip.state.el){
            return;
        }

        tooltip.clearTimers();
        tooltip.state.showTimer = window.setTimeout(() => {
            tooltip.render(elm, text);
        }, tooltip.configs.showDelay);
    },

    remove:() => {
        if(tooltip.state.el && tooltip.state.el.parentNode){
            tooltip.state.el.parentNode.removeChild(tooltip.state.el);
        }
        tooltip.state.el = null;
        tooltip.state.anchor = null;
    },

    hide:() => {
        tooltip.clearTimers();
        tooltip.state.hideTimer = window.setTimeout(() => {
            tooltip.remove();
        }, tooltip.configs.hideDelay);
    },

    isvalid:(e) => {
        let elm = tooltip.getElm(e.target);

        if(!elm){
            return {
                elm:null
            }
        }else{
            let trgr = elmH.attr.get(elm, json.get(tooltip, 'configs.attributes.trigger', ''));

            return {
                elm:elm,
                trigger:(trgr || json.get(tooltip, 'configs.trigger', 'both'))
            }
        }
    },

    mouseover:(e) => {
        let valid = tooltip.isvalid(e);
        if(valid && valid.elm){
            if(valid.trigger === 'focus'){
                return;
            }else{
                if(tooltip.isInside(e, valid.elm)){
                    return;
                }
                tooltip.show(valid.elm);
            }
        }
    },

    mouseout:(e) => {
        let valid = tooltip.isvalid(e);

        if(valid && valid.elm){
            if(valid.trigger === 'focus'){
                return;
            }else{
                let related = e.relatedTarget;
                let movedToAnchor = tooltip.isElm(related) && valid.elm.contains(related);
                let movedToTooltip = tooltip.isElm(related) && tooltip.state.el && tooltip.state.el.contains(related);

                if(movedToAnchor || movedToTooltip){
                    return;
                }
                tooltip.hide();
            }
        }
    },

    focusIn(e) {
        let valid = tooltip.isvalid(e);
        if(valid && valid.elm){
            if(valid.trigger === 'hover'){
                return;
            }else{
                tooltip.show(valid.elm);
            }
        }
    },

    focusOut:(e) => {
        let valid = tooltip.isvalid(e);
        if(valid && valid.elm){
            if(valid.trigger === 'hover'){
                return;
            }else{
                tooltip.hide();
            }
        }
    },

    reRender:() => {
        if(!tooltip.state.anchor || !tooltip.state.el){
            return;
        }else{
            if(tooltip.state.anchor){
                tooltip.render(tooltip.state.anchor, tooltip.state.anchor.getAttribute(tooltip.configs.attributes.tooltip));
            }
        }
    },

    listeners:() => {
        document.addEventListener("mouseover", tooltip.mouseover, true);
        document.addEventListener("mouseout", tooltip.mouseout, true);
        document.addEventListener("focusin", tooltip.focusIn, true);
        document.addEventListener("focusout", tooltip.focusOut, true);
        window.addEventListener("scroll", tooltip.reRender, true);
        window.addEventListener("resize", tooltip.reRender);
    },

    dli:() => {
        document.removeEventListener("mouseover", tooltip.mouseover, true);
        document.removeEventListener("mouseout", tooltip.mouseout, true);
        document.removeEventListener("focusin", tooltip.focusIn, true);
        document.removeEventListener("focusout", tooltip.focusOut, true);
        window.removeEventListener("scroll", tooltip.reRender, true);
        window.removeEventListener("resize", tooltip.reRender);
    },

    bind:() => {
        tooltip.dli();
        tooltip.listeners()
    }
}

module.exports = tooltip;