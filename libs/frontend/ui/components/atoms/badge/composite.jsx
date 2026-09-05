import Badge from './image';
import helpers from 'ui-helpers';

const Comp = (dprops) => {
    const props = (() => {
        return helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers, {});
    })();
    
    return <Badge {...props} />
};

export default Comp;