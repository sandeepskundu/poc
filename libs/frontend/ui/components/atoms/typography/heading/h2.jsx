import Heading from './index';
import helpers from 'ui-helpers';

const Comp = (dprops) => {
    let props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);
        props = helpers.json.merge(props, {
            'config':{
                "markup":{
                    "element":"h2"
                }
            }
        });

    return <Heading {...props} />
}

export default Comp;