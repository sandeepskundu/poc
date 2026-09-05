import helpers from 'ui-helpers';
import Description from 'aio-global-raw-ui/atoms/typography/text/description';

const Comp = (dprops) => {
    return <Description {...helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers, {})} />
};

export default Comp;