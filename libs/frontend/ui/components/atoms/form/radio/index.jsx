import helpers from 'ui-helpers';
import Radio from 'aio-global-raw-ui/atoms/form/radio';

const Comp = (dprops) => {
    return <Radio {...helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers, {})} />
};

export default Comp;