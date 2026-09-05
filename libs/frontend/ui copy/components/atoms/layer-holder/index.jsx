import propTypes from 'prop-types';
import UG10EOYLTUZ from 'prop-types';
import UAU2I2YXZ2R from 'prop-types';
import UTF96LMDSHL from 'prop-types';
import helpers from 'ui-helpers';
import {forwardRef, useRef, createElement} from "react";
import Text from 'aio-global-ui/atoms/typography/text';
import Description from 'aio-global-ui/atoms/typography/text/description';

const _props = {
    "wrap":false,
    "templates":{
        "layer":"Sandeep",
        "content":"This is sample body text and will get replaced with original content. This is sample body text and will get replaced with original content. This is sample body text and will get replaced with original content.",
    },

    "layer":{
        "size":"24",
        "align":"trcc",
        "dimensions":{
            "width":"",
            "height":""
        }
    },

    "content":{
        "text":{
            "content":"",
            "markup":{},
            "ds":{
                "css":{
                    "class":{}
                }
            }
        },
        "wrapper":{
            "markup":{}
        },
        "toggle":{
            "enabled":false
        }
    },

    dsTheme:{
        "layer":{
            "background":"c00404"
        },
        "wrapper":{
            "radius":"8",
            "background":"c00206"
        },
        "content":{
            "color":"c00000"
        },
        "container":{
            "background":"c00206"
        }
    },

    config:{
        "wrapper":{
            "ds":{},
            "attrs":{},
            "markup":{
                "element":"div"
            }
        },
        "container":{
            "ds":{},
            "attrs":{},
            "markup":{
                "element":"div"
            }
        },
        "content":{
            "ds":{},
            "attrs":{},
            "markup":{
                "element":"div"
            }
        },
        "layer":{
            "ds":{},
            "attrs":{},
            "markup":{
                "element":"div"
            }
        }
    }
}

const Comp = forwardRef((dprops, forwardedRef) => {
    const id = helpers.random.key();
    const ref = forwardedRef || useRef(null);
    const props = helpers.element.jsx.props.define(_props, dprops, helpers);
    
    const size = helpers.json.get(props, 'layer.size', 24);
    const align = helpers.json.get(props, 'layer.align', 'tlcc');

    const getDsTheme = (type) => {
        return helpers.json.merge(helpers.json.get(props, `config.${type}`, {}), {
            ds:{
                predefined:helpers.json.get(props, `dsTheme.${type}`, {})
            }
        });
    }

    const getAttrs = (type, cls) => {
        return helpers.element.jsx.attrs(getDsTheme(type), (cls || ''))
    }

    const alignment = () => {
        let aln = `aln-${align}`;
        let map = {
            'aln-c':'',
            'aln-tl':'pd-l__SIZE__',
            'aln-tlcc ':'pd-l__SIZE__',
            'aln-tlc':'pd-l__SIZE__',
            'aln-tlo':'pd-t__SIZE__',
            'aln-tc':'pd-t__SIZE__',
            'aln-tcc':'pd-t__SIZE__',
            'aln-tco':'pd-t__SIZE__',
            'aln-tr':'pd-r__SIZE__',
            'aln-trcc':'pd-r__SIZE__',
            'aln-trc':'pd-r__SIZE__',
            'aln-tro':'pd-r__SIZE__',
            'aln-rtc':'pd-r__SIZE__',
            'aln-rto':'pd-r__SIZE__',
            'aln-rc':'pd-r__SIZE__',
            'aln-rcc':'pd-r__SIZE__',
            'aln-rco':'pd-r__SIZE__',
            'aln-rb':'pd-r__SIZE__',
            'aln-rbc':'pd-r__SIZE__',
            'aln-rbo':'pd-r__SIZE__',
            'aln-rbcc':'pd-r__SIZE__',
            'aln-brc':'pd-b__SIZE__',
            'aln-bro':'pd-b__SIZE__',
            'aln-bc':'pd-b__SIZE__',
            'aln-bcc':'pd-b__SIZE__',
            'aln-bco':'pd-b__SIZE__',
            'aln-bl':'pd-b__SIZE__',
            'aln-blc':'pd-b__SIZE__',
            'aln-blcc':'pd-b__SIZE__',
            'aln-blo':'pd-b__SIZE__',
            'aln-lbc':'pd-l__SIZE__',
            'aln-lbo':'pd-l__SIZE__',
            'aln-lc':'pd-l__SIZE__',
            'aln-lcc':'pd-l__SIZE__',
            'aln-lco':'pd-l__SIZE__',
            'aln-ltc':'pd-l__SIZE__',
            'aln-lto':'pd-l__SIZE__'
        }

        if(map && aln && map[aln]){
            return map[aln].replaceAll(new RegExp('__SIZE__', 'g'), size);
        }

        return '';
    }

    const minHightAndWdth = (lyr) => {
        const width = helpers.json.get(props, 'layer.dimensions.width', id);
        const height = helpers.json.get(props, 'layer.dimensions.height', id);

        if((width || height) && (width != id || height != id)){
            let rv = [];

            if(lyr){
                if(height){
                    rv.push(`lyr-ho-${height}`)
                }
    
                if(width){
                    rv.push(`lyr-wo-${width}`)
                }
            }else{
                if(height){
                    rv.push(`lyr-mho-${height}`)
                }
    
                if(width){
                    rv.push(`lyr-mwo-${width}`)
                }
            }

            if(rv.length){
                return rv.join(' ');
            }
        }

        if(size && size != id){
            if(lyr){
                return `lyr-${size}`;
            }else{
                return `lyr-mh-${size}`;
            }
        }

        return ''        
    }

    const isvalid = (type) => {
        let Temp = helpers.json.get(props, `templates.${type}`, null);

        
        if(Temp && helpers.data.type.is(Temp, 'function')){
            return true;
        }

        if(Temp && helpers.data.type.is(Temp, 'jsx')){
            return true;
        }

        if(Temp && helpers.data.type.is(Temp, 'string')){
            return true;
        }

        return false;
    }

    let hasLayer = isvalid('layer');
    let hasContent = isvalid('content');

    const layerChild = () => {
        let Temp = helpers.json.get(props, `templates.layer`, null);
        
        if(Temp && helpers.data.type.is(Temp, 'function')){
            return Temp(props);
        }

        if(Temp && helpers.data.type.is(Temp, 'jsx')){
            return React.createElement(React.Fragment, {onClick:toggle, className:'bxs flx-full'}, Trgr);
        }

        if(Temp){
            return `${Temp}`;
        }

        return '';
    }

    const layer = () => {
        if(hasLayer){
            return createElement(helpers.json.get(props, 'config.layer.markup.element', 'div'), getAttrs('layer', `bxs lyr aln-${align} ${minHightAndWdth(true)}`), layerChild());
        }else{
            return <></>
        }
    }

    const typography = () => {
        let txt = helpers.json.get(props, `templates.content`, '');
        let toggle = helpers.json.get(props, 'content.toggle.enabled', false);
        let cconfig = helpers.json.copy(helpers.json.get(props, 'content', {}));
            cconfig = helpers.json.set(cconfig, 'text.content', txt, false, true);

        if(toggle){
            return <Description {...cconfig} />
        }else{
            return <Text {...cconfig} />
        }
    }

    const contentChilds = () => {
        let Temp = helpers.json.get(props, `templates.content`, null);
        
        if(Temp && helpers.data.type.is(Temp, 'function')){
            return Temp(props);
        }

        if(Temp && helpers.data.type.is(Temp, 'jsx')){
            return React.createElement(React.Fragment, {onClick:toggle, className:'bxs flx-full'}, Trgr);
        }

        if(Temp && helpers.data.type.is(Temp, 'string')){
            return typography();
        }

        if(Temp){
            return `${Temp}`;
        }

        return '';
    }

    const content = () => {
        if(hasContent){
            return createElement(helpers.json.get(props, 'config.content.markup.element', 'div'), getAttrs('content', `full bxs`), contentChilds());
        }else{
            return <></>
        }
    }

    const childs = () => {
        return (
            <>
                {layer()}
                {content()}
            </>
        )
    }

    const container = () => {
        return createElement(helpers.json.get(props, 'config.container.markup.element', 'div'), getAttrs('container', `bxs pr full ${alignment()} ${minHightAndWdth()}`), childs())
    }

    const ui = () => {
        if(hasLayer || hasContent){
            if(props.wrap){
                return createElement(helpers.json.get(props, 'config.wrapper.markup.element', 'div'), getAttrs('wrapper', 'bxs pr full'), container())
            }else{
                return container();
            }
        }else{
            return <></>
        }
    }

    return ui();
});

export default Comp;