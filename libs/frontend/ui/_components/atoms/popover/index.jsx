import helpers from 'ui-helpers';
import {createElement, forwardRef, useRef} from 'react';

const Comp = forwardRef((dprops, fRef) => {
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);

    const ref = fRef || useRef(null);
    const rId = helpers.random.key();
    const openat = helpers.json.get(props, 'controls.toggle', 'click');
    const renderAs = helpers.json.get(props, 'controls.mode', 'static');
    const templates = (() => {
        return helpers.json.merge({
            trigger:null,
            content:null
        }, helpers.json.get(props, 'templates', {}));
    })();

    const getTemplate = (type) => {
        let Temp = helpers.json.get(templates, type, null);
                
        if(Temp && helpers.data.type.is(Temp, 'function')){
            return Temp(props);
        }

        if(Temp && helpers.data.type.is(Temp, 'jsx')){
            return React.createElement(React.Fragment, {}, Temp);;
        }

        if(Temp && helpers.data.type.is(Temp, 'string')){
            return Temp;
        }

        return '';
    }

    const button = () => {
        return getTemplate('trigger');
    }

    const trigger = () => {
        let inptId = `${rId}Cbx`;

        switch (openat) {
            case 'hover':
                return button();
            break;
            default:
                return (
                    <>
                        <label htmlFor={inptId} className='bxs flx-full'>{button()}</label>
                        <input type="checkbox" onChange={(e) => {console.log(e)}} data-comp-elm="popover-toggle" id={inptId} data-comp-rId={rId} className='po-trg-inpt' />
                    </>
                )
        }
    }

    const mapArrowColors = (arg) => {
        let arrow = helpers.json.get(props, 'controls.arrow', false);

        if(arrow){
            //let clr = helpers.json.val(arg, 'ds.predefined.color', '');
            //let hclr = helpers.json.val(arg, 'ds.predefined.hcolor', '');
            let bdr = helpers.json.val(arg, 'ds.predefined.border', '');
            let hbdr = helpers.json.val(arg, 'ds.predefined.hborder', '');
            let bg = helpers.json.val(arg, 'ds.predefined.background', '');
            let hbg = helpers.json.val(arg, 'ds.predefined.hbackground', '');

            if(bdr){
                arg = helpers.json.set(arg, 'ds.predefined.bborder', bdr);
            }

            if(hbdr){
                arg = helpers.json.set(arg, 'ds.predefined.hbborder', hbdr);
            }

            if(bg){
                arg = helpers.json.set(arg, 'ds.predefined.abackground', bg);
            }

            if(hbg){
                arg = helpers.json.set(arg, 'ds.predefined.habackground', hbg);
            }
        };

        return arg;
    }

    const contentDs = () => {
        let cls = ['poc dd transition bxs bdr-1'];
        let ds =  helpers.json.get(props, 'config.content', {}); //mergeTheme('content');
        let arrow = helpers.json.get(props, 'controls.arrow', false);

        if(arrow){
            cls.push('has-arrow');
        }

        return helpers.element.jsx.attrs(mapArrowColors(ds), cls.join(' '));
    }

    const contentUi = (render) => {
        let pos = helpers.json.get(props, 'controls.position', 'bottom-right');
        return (
            <div className={`poh bxs ${pos}`}>
                <div {...contentDs()}>
                    {props.children || render}
                </div>
            </div>
        )
    }

    const content = () => {
        let renderer = getTemplate('content');

        if(props.children || renderer){
            if(openat === 'click' && renderAs === 'react'){
                let open = helpers.json.get(props, 'controls.open', false);
                if(open){
                    return contentUi(renderer);
                }else{
                    return <></>
                }
            }else{
                return contentUi(renderer);
            }
        }else{
            return <></>
        }
    }

    const childs = () => {
        return (
            <>  
                {trigger()}
                {content()}
            </>
        )
    }

    const wrprAttrs = () => {
        let conf = helpers.json.get(props, 'config.wrapper', {});
            conf = helpers.json.merge(conf, {
                "dataAttrs":{
                    "data-comp-id":rId,
                    "data-comp":"popover",
                }
            })

        let rval = helpers.element.jsx.attrs(conf, `po full ow-${openat} ra-${renderAs}`);

        if(ref){
            rval = {...rval, ...{ref:ref}}
        };

        return rval;
    }

    const ui = () => {
        let trigger = getTemplate('trigger');

        if(trigger){
            return createElement(helpers.json.get(props, 'config.wrapper.markup.element', 'div'), wrprAttrs(), childs());
        }else{
            return <></>
        }
    }

    return ui();
})

export default Comp;