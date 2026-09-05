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
    icon={{
        ds:{}, // Icon ds config as we setup globally.
        attrs:{}, // Html attribute of Icon container
        markup:{}, // Html tag name of wrapper element.
        type:"font", // Type of icon like font/svg.
        svg:{
            style:{}, // Inline style props if icon is in SVG format
            src:null, // SVG string
            size:"24px" // Size of SVG icon
        },
        icon:{
            size:16, // Size of icon => First point to global dsTheme config passed to this component.
            name:'da', // Name of icon
            family:'g' // Family of icon like
        }
    }}
    config={{ // This is design system config where we can configure.
        wrapper:{}
    }}
}

--*/

const Comp = (dprops) => {
    let props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);

    const ui = () => {
        return (
            <Aavatar
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

    return ui();
}

Comp.__PROP__TYPES__

Comp.__DEFAULT__PROP__

export default Comp;