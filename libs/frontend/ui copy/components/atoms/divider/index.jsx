import helpers from 'ui-helpers';
import {createElement} from 'react';

/*--
const _props = {
    content:'2',
    dsTheme:{
        minHeight:2,
		color:'c00000',
		background:'c11407',
	},
    config:{
        "markup":{
            "element":"span"
        }
    }
}--*/

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);

    const dsTheme = () => {
        return helpers.json.merge(helpers.json.get(props, 'config', {}), {
            ds:{
                predefined:helpers.json.get(props, 'dsTheme', {})
            }
        });
    }

    return createElement(helpers.json.get(props, "config.markup.element", "div"), helpers.element.jsx.attrs(dsTheme(), 'anim sep full'), <></>);
};

Comp.__PROP__TYPES__

Comp.__DEFAULT__PROP__

export default Comp;