import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import Input from 'aio-global-ui/atoms/form/input';
import SelectBox from 'aio-app-ui-atoms/select-box';
import PropValueMapper from 'aio-app-ui-organisms/props-editor/prop-value-mapper';

const PropTypes = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    const config = helpers.json.val(props, 'details.config');
    const type = helpers.json.val(props, 'details.config.type');
    const selected =  helpers.json.val(props, `details.config.value.type`);
    const options = helpers.json.val(props, 'configs.props.value.types', {});
    const valmapnode = 'details.config.value.map';
    const dvalmapnode = 'details.config.value.default';
    const mapval =  (() => {
        let mp = helpers.json.val(props, valmapnode, '');
            if(mp){
                return mp.split('.')
            }else{
                return [];
            }
    })();

    const map = () => {
        let sel = helpers.json.val(props, 'selected', []);
        let rsel = [...sel]
            rsel.push('config')
        return rsel;
    }

    const onChange = (arg, vtype) => {
        if(props.onChange){
            props.onChange(arg, map(), vtype);
        }
    }

    const onTypeChange = (arg, vtype) => {
        let d = helpers.json.copy(config);
        let v = helpers.json.val(arg, 'id', '');
            d = helpers.json.set(d, `value.type`, v, false, false);
            onChange(d, vtype);
    }

    const onMapChange = (arg, vtype) => {
        let d = helpers.json.copy(config);
            d = helpers.json.set(d, 'value.map', arg.join('.'), false, false);
            onChange(d, vtype);
    }

    const onInputChange = (e, vtype) => {
        let d = helpers.json.copy(config);
            d = helpers.json.set(d, 'value.default', helpers.json.val(e, 'target.value', ''), false, true);
            onChange(d, vtype);
    }

    const onBooleanChange = (arg, vtype) => {
        let d = helpers.json.copy(config);
        let v = helpers.json.val(arg, 'id', false);
            d = helpers.json.set(d, 'value.default', v, false, true);
            onChange(d, vtype);
    }

    const dvalue = () => {
        switch(type) {
            case 'boolean':
                const dv = helpers.json.val(props, 'details.config.value.default', false)
                return (
                    <SelectBox 
                        noBlank={true}
                        selected={dv || false}
                        list={helpers.json.val(props, 'configs.props.boolean.types', {})}
                        selectBoxProps={{
                            label:"Default value",
                            onSelect:(el, arg, i) => {
                                onBooleanChange(arg, 'default-value')
                            }
                        }}
                    />
                )
            break;
            default:
                return (
                    <Input
                        label="Default value"
                        onChange={(e) => {onInputChange(e, 'default-value')}}
                        value={helpers.json.val(props, 'details.config.value.default', '')}
                    />
                )
        }
    }

    return (
        <>
            <div className='full bxs grid-wrapper'>
                <p className='full fm-sb pd-b24'>Value type and default value</p>
                <ul className='full bxs grid-wrapper'>
                    <li className='grid-w2 bxs pd-r16'>
                        <SelectBox 
                            list={options}
                            noBlank={true}
                            selected={selected || ''} 
                            selectBoxProps={{
                                label:"Value type",
                                onSelect:(el, arg, i) => {
                                    onTypeChange(arg, 'value-type')
                                }
                            }}
                        />
                    </li>
                    <li className='grid-w10 bxs pd-r16'>
                        {dvalue()}
                    </li>
                </ul>
            </div>
            <div className='full bxs grid-wrapper pd-t16'>
                <p className='full fm-sb pd-b10'>Value map from data</p>
                <PropValueMapper 
                    valuemap={mapval}
                    defaultValuemap={dvalmapnode}
                    onChange={(arg) => {onMapChange(arg, 'value-map')}}
                    data={helpers.json.val(props, 'data', {})}
                    rdata={helpers.json.val(props, 'data', {})}
                    configs={helpers.json.val(props, 'configs', {})}
                    details={helpers.json.val(props, 'details', {})}
                    selected={helpers.json.val(props, 'selected', [])}
                />
            </div>
        </>
    )
}

export default PropTypes;