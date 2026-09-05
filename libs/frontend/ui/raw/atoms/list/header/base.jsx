import helpers from 'ui-helpers';
import BaseItem from 'aio-global-raw-ui/atoms/list/item/base';

const Comp = (dprops) => {
    return <BaseItem {...helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers)} />;
};

export default Comp;