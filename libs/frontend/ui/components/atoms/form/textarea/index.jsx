import helpers from 'ui-helpers';
import Textarea from 'aio-global-raw-ui/atoms/form/textarea';

const Comp = (dprops) => {
    return <Textarea {...helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers, {})} />
};

export default Comp;