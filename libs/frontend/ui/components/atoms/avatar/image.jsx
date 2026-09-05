import helpers from 'ui-helpers';
import Aavatar from 'aio-global-raw-ui/atoms/avatar/image';

const Comp = (dprops) => {
    return <Aavatar {...helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers, {})} />
};

export default Comp;