import helpers from 'ui-helpers';
import Badge from 'aio-global-raw-ui/atoms/badge';

const Comp = (dprops) => {
    return <Badge {...helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers, {})} />
};

export default Comp;