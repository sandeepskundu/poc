import helpers from 'ui-helpers';
import {createElement} from 'react';

const Comp = (dprops) => {
    const id = helpers.random.uuid();
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);

    const fluid = helpers.json.get(props, 'fluid', false);
    const paddingOff = helpers.json.get(props, 'paddingOff', false);

    const cls = () => {
        let rval = ['anim container bxs full'];

        if(paddingOff){
            rval.push('pd-rln')
        }

        if(fluid){
            rval.push('fluid');
        }

        return rval.join(' ');
    }

    const ui = () => {
        const ctnt = helpers.json.get(props, 'content', id);

        if(ctnt != id || props.children){
            return createElement(
                helpers.json.get(props, "config.markup.element", "div"), 
                helpers.element.jsx.attrs(helpers.json.get(props, 'config', {}), cls()), 
                helpers.element.jsx.getChild(props, createElement, props.children, props)
            );
        }else{
            return <></>
        }
    }

    return ui();
};

export default Comp;