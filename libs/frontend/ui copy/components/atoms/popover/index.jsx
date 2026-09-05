import helpers from 'ui-helpers';
import {createElement, forwardRef} from 'react';

/*--
const _pd = {
    controls:{
        open:false,
        arrow:true,
        mode:'static', // static or react;
        toggle:'hover', // click, hover
        position:'bottom-right' // top-left|top-center|top-right|right-top|right-center|right-bottom|bottom-right|bottom-center|bottom-left|left-top|left-center|left-top
    },
    dsTheme:{
        "wrapper":{},
        "content":{
            radius:'8',
            border:'c00208',
            background:"c00307"
        }
    },
    config:{
        "content":{
            "ds":{
                "css":{
                    "class":{
                        "padding":{}
                    }
                }
            }
        },
        "wrapper":{
            "markup":{
                "element":"div"
            },
            "ds":{
                "css":{
                    "class":{
                        "padding":{}
                    }
                }
            }
        }
    }
}--*/

const Comp = forwardRef((dprops, ref) => {
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);
    const rId = helpers.random.key();
    const openat = helpers.json.get(props, 'controls.toggle', 'click');
    const renderAs = helpers.json.get(props, 'controls.mode', 'static');

    const defaults = {};
    const templates = (() => {
        return helpers.json.merge({
            trigger:null,
            content:null
        }, helpers.json.get(props, 'templates', {}));
    })();

    const mergeDs = (map, type) => {
        if(type === 'ds'){
            return helpers.element.jsx.props.merge.ds(props, map, defaults);
        }else{
            return helpers.element.jsx.props.merge.predefined(props, map, defaults);
        }
    }

    const dsTheme = (arg) => {
        return helpers.json.merge(helpers.json.get(arg, `config`, {}), {
            ds:{
                predefined:helpers.json.get(arg, `dsTheme`, {})
            }
        });
    }

    const mergeTheme = (type) => {
        return dsTheme({
            dsTheme:mergeDs(type),
            config:mergeDs(type, 'ds')
        });
    }

    const getTemplate = (type) => {
        let rv = helpers.json.get(templates, type, null);
        let isfun = helpers.data.type.is(rv, 'function');
        
        if(isfun){
            return rv;
        }
    }

    const button = () => {
        let renderer = getTemplate('trigger');
        if(renderer){
            return renderer(props);
        }
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
        let ds = mergeTheme('content');
        let cls = ['poc dd transition bxs bdr-1'];
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
                    {(props.children?props.children:render(props))}
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
        let rval = helpers.element.jsx.attrs(dsTheme(helpers.json.merge({
            config:mergeDs('wrapper', 'ds'),
            dsTheme:mergeDs('wrapper')
        }, {
            config:{
                "dataAttrs":{
                    "data-comp-id":rId,
                    "data-comp":"popover",
                }
            }
        })), `po full ow-${openat} ra-${renderAs}`);

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