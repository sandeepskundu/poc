import helpers from 'ui-helpers';
import {createElement} from 'react';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);
    const config = (() => {
        return helpers.element.jsx.getCompThemeDs(helpers.json.merge(helpers.json.get(props, 'config', {}), {
            ds:{
                theme:{
                    background:props.color || {}
                },
                predefined:helpers.json.get(props, 'dsTheme', {})
            }
        }), 'dot');
    })();

    const elm = helpers.json.get(config, "markup.element", "span");
    const Element = elm;

    const cls = () => {
        let rval = ['dot'];

        if(props.size){
            rval.push(props.size);
        }

        return rval.join(' ');
    }

    return <Element {...helpers.element.jsx.attrs(config, cls())}>&nbsp;</Element>
}

Comp.__PROP__TYPES__

Comp.__DEFAULT__PROP__

export default Comp;