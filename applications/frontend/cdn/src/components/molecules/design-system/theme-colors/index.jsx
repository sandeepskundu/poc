import React from 'react';
import helpers from 'ui-helpers';
import Colors from 'aio-app-ui-atoms/design-system/colors';

const ThemeColors = (props) => {
    let selected =  helpers.json.val(props, 'selected', {});
    let hsel = helpers.json.val(selected, 'hover');
    let dsel = helpers.json.val(selected, 'default');

    const onChange = (arg, type) => {
        let sel = helpers.json.copy(selected);

        if(arg.id){
            sel[type] = arg.id;
        }else{
            delete sel[type];
        }

        let sl = helpers.json.length(arg);

        if(props.onChange){
            if(sl > 0){
                props.onChange(sel);
            }else{
                props.onChange(false);
            }
        }
    }

    const defaultColors = (type, seltd) => {
        let cp = helpers.json.val(props, `colorPairing.${type}`);
        if(!cp){
            return (
                <div className='_grid _pd-r20 full pd-t24 bxs'>
                    <Colors
                        selected={seltd}
                        dsData={props.dsData}
                        lable={`${props.type} ${type} color`}
                        onChange={(arg) => {onChange(arg, type)}}
                    />
                </div>
            )
        }
    }

    const heading = () => {
        return <p className='full fm-sb cap'>{props.type}</p>
    }

    const ui = () => {
        let hvr = helpers.json.val(props, `colorPairing.hover`);
        let dflt = helpers.json.val(props, `colorPairing.default`);
        if(!hvr || !dflt){
            return (
                <div className='full pd-t24 bxs'>
                    {heading()}
                    <div className='full _grid-wrapper _grid-layout-2'>
                        {defaultColors('default', dsel)}
                        {defaultColors('hover', hsel)}
                    </div>
                </div>
            )
        }

        return <></>
    }

    return ui(

    )
}

export default ThemeColors;