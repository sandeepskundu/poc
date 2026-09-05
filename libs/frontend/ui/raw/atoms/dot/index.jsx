import helpers from 'ui-helpers';
import {createElement} from 'react';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);

    return createElement(helpers.json.get(props, "config.markup.element", "div"), helpers.element.jsx.attrs(helpers.json.get(props, 'config', {}), 'dot'), <>&nbsp;</>);
};

export default Comp;