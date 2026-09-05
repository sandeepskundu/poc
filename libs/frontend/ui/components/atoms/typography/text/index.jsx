import helpers from 'ui-helpers';
import Text from 'aio-global-raw-ui/atoms/typography/text';

const Comp = (dprops) => {
    return <Text {...helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers, {})} />
};

export default Comp;