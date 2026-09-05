import helpers from 'ui-helpers';
import Icon from 'aio-global-ui/atoms/badge/icon'

const Comp = (dprops) => {
    const props = () => {
        let rv = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers, {});
            rv = helpers.json.set(rv, 'icons.left', helpers.json.get(rv, 'icon', {}));
            helpers.json.remove(rv, 'icon');

        return rv;
    };

    return <Icon {...props()} />
};

export default Comp;