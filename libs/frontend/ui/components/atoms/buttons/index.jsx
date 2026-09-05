import helpers from 'ui-helpers';
import Button from 'aio-global-raw-ui/atoms/form/button';

const Comp = (dprops) => {
    return <Button {...helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers, {})} />
};

export default Comp;