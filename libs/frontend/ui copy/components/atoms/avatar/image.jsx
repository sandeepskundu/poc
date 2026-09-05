import helpers from 'ui-helpers';
import {createElement} from 'react';
import Aavatar from 'aio-global-ui/atoms/avatar';

/*-- 

const _dconf = {
    nowrapper={false} // Defines that initial / icon or avatar shadow be wrap in any element.
    dsTheme={{
        size:40, // Size of thumnail like 40X40, 56X56
        outer:20, // Width of outer box where displays border like gray etc.
        shadow:'sm', // shadow on outer box
        radius:'round', // Radius of image and outer box
        color:'c00000', // Text color of initial
        hcolor:'c11806', // Hover text color of initial > this will apply on both case like icon and font both
        background:'c12306', // Background color of outer.
        hbackground:'g00003' // Hover background color of outer.
    }}
    image={{
        src:'
    }}
    config={{ // This is design system config where we can configure.
        wrapper:{},
        image:{}
    }}
}

--*/

const Comp = (dprops) => {
    let props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);

    const ui = () => {
        return (
            <Aavatar
                image={helpers.json.get(props, 'image', {})}
                dsTheme={helpers.json.get(props, 'dsTheme', {})}
                nowrapper={helpers.json.get(props, 'nowrapper', false)}
                config={{
                    initial:null,
                    image:helpers.json.get(props, 'config.image', {}),
                    wrapper:helpers.json.get(props, 'config.wrapper', {})
                }}
            />
        )
    }

    return ui();
}

Comp.__PROP__TYPES__

Comp.__DEFAULT__PROP__

export default Comp;