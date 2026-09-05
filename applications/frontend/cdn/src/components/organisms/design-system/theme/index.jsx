import React from 'react';
import helpers from 'ui-helpers';
import ThemeColors from 'aio-app-ui-molecules/design-system/theme-colors';
import ThemeColorPairing from 'aio-app-ui-molecules/design-system/theme-color-pairing';

const DsTheme = (props) => {
    let thmap = `ds.theme`;
    let selected =  helpers.json.val(props, `dsProps.${thmap}`, {});

    const colorPairing = (arg) => {
        let rv = {};
        if(arg.colorPairing){
            let removeMap = {
                "default":{
                    'text.default':true,
                    'border.default':true,
                    'background.default':true
                },
                "hover":{
                    'text.hover':true,
                    'border.hover':true,
                    'background.hover':true
                }
            }

            for(const a in removeMap){
                let val = arg.colorPairing[a];
                if(!val){
                    for(const b in removeMap[a]){
                        const vl = helpers.json.val(arg, b);
                        if(vl){
                            rv = helpers.json.set(rv, b, vl, false, true);
                        }
                    }
                }else{
                    rv.colorPairing = rv.colorPairing || {};
                    rv.colorPairing[a] = val;
                }
            }
        }else{
            const vmap = {
                'text.default':true,
                'border.default':true,
                'background.default':true,
                'text.hover':true,
                'border.hover':true,
                'background.hover':true
            }

            for(const a in vmap){
                let val = helpers.json.val(arg, a);
                if(val){
                    rv = helpers.json.set(rv, a, val, false, true);
                }
            }
        }

        return rv;
    }

    const onChange = (arg, type) => {
        let sel = helpers.json.copy(selected);

        if(arg){
            sel[type] = arg;
        }else{
            delete sel[type];
        }

        sel = colorPairing(sel);

        if(props.onChange){
            props.onChange(sel, thmap);
        }
    }

    const paring = () => {
        return (
            <ThemeColorPairing
                layout={props.layout}
                dsData={props.dsData}
                dsProps={props.dsProps}
                onChange={(arg) => {onChange(arg, 'colorPairing')}}
                selected={helpers.json.val(selected, 'colorPairing', {})}
            />
        )
    }

    const getThemeColors = (label, type) => {
        return (
            <ThemeColors
                type={label}
                layout={props.layout}
                dsData={props.dsData}
                dsProps={props.dsProps}
                onChange={(arg) => {onChange(arg, type)}}
                selected={helpers.json.val(selected, type, {})}
                colorPairing={helpers.json.val(selected, 'colorPairing', {})}
            />
        )

    }

    const ui = () => {
        const layout = helpers.json.val(props, 'layout');
        switch(layout) {
            case 'page':
                return (
                    <div className='full grid-wrapper grid-layout-4 bxs'>
                        <div className='grid pd-r16 bxs'>{paring()}</div>
                        <div className='grid pd-r16 bxs'>{getThemeColors('Background', 'background')}</div>
                        <div className='grid pd-r16 bxs'>{getThemeColors('Border', 'border')}</div>
                        <div className='grid pd-r16 bxs'>{getThemeColors('Text', 'text')}</div>
                    </div>
                )
            break;
            default:
                return (
                    <>
                        {paring()}
                        {getThemeColors('Background', 'background')}
                        {getThemeColors('Border', 'border')}
                        {getThemeColors('Text', 'text')}
                    </>
                )
        }

        return (
            <>
                {paring()}

                <ThemeColors
                    type={'Background'}
                    layout={props.layout}
                    dsData={props.dsData}
                    dsProps={props.dsProps}
                    onChange={(arg) => {onChange(arg, 'background')}}
                    selected={helpers.json.val(selected, 'background', {})}
                    colorPairing={helpers.json.val(selected, 'colorPairing', {})}
                />
            
                <ThemeColors
                    type={'Border'}
                    layout={props.layout}
                    dsData={props.dsData}
                    dsProps={props.dsProps}
                    onChange={(arg) => {onChange(arg, 'border')}}
                    selected={helpers.json.val(selected, 'border', {})}
                    colorPairing={helpers.json.val(selected, 'colorPairing', {})}
                />

                <ThemeColors
                    type={'Text'}
                    layout={props.layout}
                    dsData={props.dsData}
                    dsProps={props.dsProps}
                    onChange={(arg) => {onChange(arg, 'text')}}
                    selected={helpers.json.val(selected, 'text', {})}
                    colorPairing={helpers.json.val(selected, 'colorPairing', {})}
                />
            </>
        )
    }

    return ui();
}

export default DsTheme;