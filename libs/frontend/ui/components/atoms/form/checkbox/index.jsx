import helpers from 'ui-helpers';
import Checkbox from 'aio-global-raw-ui/atoms/form/checkbox';

const Comp = (dprops) => {
    return <Checkbox {...helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers, {})} />
};

export default Comp;