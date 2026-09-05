import helpers from 'ui-helpers';
import Input from 'aio-global-raw-ui/atoms/form/input';

const Comp = (dprops) => {
    return <Input {...helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers, {})} />
};

export default Comp;