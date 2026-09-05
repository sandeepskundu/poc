import Text from './index';
import helpers from 'ui-helpers';
import {createElement} from 'react';
import ReactDOMServer from "react-dom/server";

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);

    const readmore = () => {
        const id = helpers.random.id(24);
        const line = helpers.json.val(props, 'toggle.lines', 2);
        const align = helpers.json.val(props, 'toggle.align', 'al');
        const srt = ReactDOMServer.renderToStaticMarkup(<Text {...props.description} />);
        const lbel = helpers.element.jsx.attrs(props.toggle || {}, 'rd-mor-lss-lbl cp link-u');

        return (
            <>
                <input type="checkbox" className='rd-mor-lss-chbx' id={id} />
                <div dangerouslySetInnerHTML={{__html:srt}} className={`rd-mor-lss-ctnt full lc-${line}`} data-comp="readmore"></div>
                <div className={`full mr-t10 rd-mor-lbl-hldr ${align}`} data-nosnippet>
                    <label {...helpers.json.merge(lbel, {
                        'htmlFor':id,
                        'data-more-label':helpers.json.val(props, 'toggle.label.more'),
                        'data-less-label':helpers.json.val(props, 'toggle.label.less')
                    })}></label>
                </div>
            </>
        )
    }
   
    const childs = () => {
        if(props.children){
            return props.children;
        }

        return readmore();
    }
   
    const ui = () => {
        let toggle = helpers.json.val(props, 'toggle.enabled', false);
   
        if(toggle){
            let elm = helpers.json.val(props, 'wrapper.markup.element', 'div');
            return createElement(elm, helpers.element.jsx.attrs(props.wrapper || {}, 'rd-mor-lss full'), childs())
        }else{
            return <Text {...props.description} />;
        }
    }
   
    return ui();
}

Comp.__PROP__TYPES__

Comp.__DEFAULT__PROP__

export default Comp;