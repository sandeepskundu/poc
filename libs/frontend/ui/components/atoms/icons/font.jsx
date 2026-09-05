import helpers from 'ui-helpers';
import Icon from 'aio-global-raw-ui/atoms/icons/font';

const Comp = (dprops) => {
    return <Icon {...helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers, {})} />
};

export default Comp;