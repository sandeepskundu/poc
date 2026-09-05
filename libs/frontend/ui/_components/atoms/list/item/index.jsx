import helpers from 'ui-helpers';
import {createElement} from 'react';
import ContentRow from 'aio-global-ui/atoms/content-row';

const Comp = (dprops) => {
	const id = helpers.random.uuid();
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);

    const ui = () => {
        if(props.children){
            return props.children;
        }else{
            return (
                <ContentRow {...props} />
            )
        }
    }

    return ui();
};

Comp.__PROP__TYPES__

Comp.__DEFAULT__PROP__

export default Comp;