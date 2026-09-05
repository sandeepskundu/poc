import helpers from 'ui-helpers';
import Image from 'aio-global-raw-ui/atoms/image';

const Comp = (dprops) => {
    return <Image {...helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers, {})} />
};

export default Comp;