import helpers from 'ui-helpers';
import {createElement} from 'react';

const Comp = (dprops) => {
    let props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);

    return helpers.element.jsx.ds(props.config, createElement, props.children, '', props)
}

Comp.__PROP__TYPES__

Comp.__DEFAULT__PROP__

export default Comp;