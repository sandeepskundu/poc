import helpers from 'ui-helpers';
import Toggle from 'aio-global-raw-ui/atoms/form/toggle';

const Comp = (dprops) => {
    return <Toggle {...helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers, {})} />
};

export default Comp;