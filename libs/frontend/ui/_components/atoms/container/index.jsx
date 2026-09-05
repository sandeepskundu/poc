import helpers from 'ui-helpers';
import {createElement} from 'react';

const Comp = (dprops) => {
    const id = helpers.random.uuid();
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);

    const ui = () => {
        const ctnt = helpers.json.get(props, 'content', id);

        if(ctnt != id || props.children){
            return createElement(
                helpers.json.get(props, "config.markup.element", "div"), 
                helpers.element.jsx.attrs(helpers.json.get(props, 'config', {}), 'anim container bxs full'), 
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