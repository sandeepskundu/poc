import helpers from 'ui-helpers';
import Container from 'aio-global-raw-ui/atoms/container';

const Comp = (dprops) => {
    return <Container {...helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers)} />
};

export default Comp;