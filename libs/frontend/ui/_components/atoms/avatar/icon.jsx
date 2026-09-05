import helpers from 'ui-helpers';
import {createElement} from 'react';
import Aavatar from 'aio-global-ui/atoms/avatar';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);

    return (
        <Aavatar
            image={null}
            initial={null}
            icon={helpers.json.get(props, 'icon', {})}
            dsTheme={helpers.json.get(props, 'dsTheme', {})}
            nowrapper={helpers.json.get(props, 'nowrapper', false)}
            config={{
                image:null,
                initial:null,
                wrapper:helpers.json.get(props, 'config.wrapper', {})
            }}
        />
    )
}

Comp.__PROP__TYPES__

Comp.__DEFAULT__PROP__

export default Comp;