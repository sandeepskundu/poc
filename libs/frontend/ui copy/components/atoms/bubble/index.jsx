import helpers from 'ui-helpers';
import {createElement} from 'react';

/*--
const _props = {
    content:'2',
    dsTheme:{
		color:'c00000',
		background:'c11407'
	},
    config:{
        "markup":{
            "element":"span"
        }
    }
}--*/

const Comp = (dprops) => {
	const id = helpers.random.uuid();
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);

    const dsTheme = () => {
        return helpers.json.merge(helpers.json.get(props, 'config', {}), {
            ds:{
                predefined:helpers.json.get(props, 'dsTheme', {})
            }
        });
    }

    const ui = () => {
        const ctnt = helpers.json.get(props, 'content', id);

        if(ctnt != id || props.children){
            return createElement(
                helpers.json.get(props, "config.markup.element", "span"), 
                helpers.element.jsx.attrs(dsTheme(), 'anim bubble ns flx-vc'), 
                helpers.element.jsx.getChild(props, createElement, props.children, props)
            );
        }else{
            return <></>
        }
    }

    return ui();
};

Comp.__PROP__TYPES__

Comp.__DEFAULT__PROP__

export default Comp;