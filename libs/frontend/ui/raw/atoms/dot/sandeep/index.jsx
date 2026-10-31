
import helpers from 'ui-helpers';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);

    const ui = () => {
        return <></>
    }

    return ui();
};

export default Comp;