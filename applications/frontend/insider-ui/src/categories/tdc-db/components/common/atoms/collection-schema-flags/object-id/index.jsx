import helpers from 'ui-helpers';
import mhelpers from 'aio-app-ui-tdc-db-modules';
import Toggle from 'aio-global-ui/atoms/form/toggle';
import ENUMS from 'aio-app-ui-tdc-db-modules/enums/enums';
import React, {useEffect, createElement, useMemo} from 'react';
import AllInOneValidationInputs from 'aio-app-ui-tdc-db-atoms/collection-schema-validations/all-in-one';

const NumberFlags = (props) => {
    const id = helpers.random.id(10);
    const dlist = helpers.json.val(ENUMS, 'UI_ENUMS.SWITCH', []);

    let sel = helpers.json.val(props, 'selected', []);
    let details = helpers.json.val(props, `details`, {});

    let list = (() => {
        let pl = helpers.json.val(props, 'preList', []);
        let rval = [...pl];
            return rval.concat(dlist);
    })()

    const onChange = (checked, arg) => {
        let vmap = helpers.json.val(arg, 'valuemap');
        
        if(checked){
            let dv = mhelpers.enums.get.defaultOptionsValue(arg, props, '__NA_DV__');
                details = helpers.json.set(details, vmap, dv, false, (dv != '__NA_DV__'));
        }else{
            helpers.json.remove(details, vmap);
        }
        
        if(props.onChange){
            props.onChange(details, sel);
        }
    }

    const childChange = (arg, vm) => {
        if(props.onChange){
            props.onChange(arg, vm);
        }
    }

    const isSelected = (arg) => {
        return helpers.json.val(details, arg.valuemap);
    }

    const AllInOneOptions = (arg) => {
        return (
            <AllInOneValidationInputs 
                item={arg}
                onChange={(item, vm) => {childChange(item, vm)}}
                configs={helpers.json.val(props, 'configs', {})}
                details={helpers.json.val(props, 'details', {})}
                selected={helpers.json.val(props, 'selected', [])}
            />
        )
    }

    const odevn = (index) => {
        return '';
        if(index % 2 != 0){
            return 'bg-c00102';
        };

        return ''
    }

    const ui = () => {
        return list.map((arg, i) => {
            const id = helpers.json.val(arg, 'id');

            if(id != 'default'){
                return (
                    <div className={`full pd-tb14 ${odevn(i)}`} key={id+i}>
                        <div className='full bxs grid-wrapper'>
                            <div className='grid-w2'>
                                <Toggle 
                                    label={arg.label}
                                    checked={isSelected(arg)}
                                    onChange={(checked, prop) => {
                                        onChange(checked, arg);
                                    }}
                                />
                            </div>
                            <div className='grid-w10'>
                                {AllInOneOptions(arg)}
                            </div>
                        </div>
                    </div>
                )
            }else{
                return <></>
            }
        })
    }

    return (
        <div className='full bxs'>
            <p className='full pd-b20 fm-sb'>Date Flags</p>
            {ui()}
        </div>
    )
}

export default NumberFlags;