import helpers from 'ui-helpers';
import mhelpers from 'aio-app-ui-schema-modules';
import ENUMS from 'aio-app-ui-schema-modules/enums/enums';
import Toggle from 'aio-global-ui/atoms/form/toggle';
import React, {useEffect, createElement, useMemo} from 'react';
import ObjectId from 'aio-app-ui-atoms/schema-editor/schema-flags/object-id';
import DateFlags from 'aio-app-ui-atoms/schema-editor/schema-flags/date-flags';
import EmailFlags from 'aio-app-ui-atoms/schema-editor/schema-flags/email-flags';
import ObjectFlags from 'aio-app-ui-atoms/schema-editor/schema-flags/object-flags';
import SwitchFlags from 'aio-app-ui-atoms/schema-editor/schema-flags/switch-flags';
import StringFlags from 'aio-app-ui-atoms/schema-editor/schema-flags/string-flags';
import NumberFlags from 'aio-app-ui-atoms/schema-editor/schema-flags/number-flags';
import BooleanFlags from 'aio-app-ui-atoms/schema-editor/schema-flags/boolean-flags';

const GlobalFlags = (props) => {
    const type = helpers.json.val(props, 'details.type', '');
    const common = helpers.json.val(ENUMS, 'UI_ENUMS.GLOBAL', []);
    const map = helpers.json.val(ENUMS, 'UI_ENUMS.TYPE_BASE', []);
    const prelist = helpers.json.val(ENUMS, 'UI_ENUMS.COMMON_FOR_ALL', []);

    let id = helpers.random.id(10);
    let sel = helpers.json.val(props, 'selected', []);
    let details = helpers.json.val(props, `details`, {});
    let list = (() => {
        let ptt = type.toUpperCase()
        let rval = [...common]
        let tmap = helpers.json.val(ENUMS, 'UI_ENUMS.HASMAP', []);
        let pt = tmap[ptt] || ptt;
            pt = pt.toUpperCase()

        if(pt && map[pt] && map[pt].length > 0){
            rval = rval.concat(map[pt]);
        }

        return rval;
    })();

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

    const ui = () => {
        return list.map((arg, i) => { 
            return (
                <div className='pd-b14 pd-r16' key={id+i}>
                    <Toggle 
                        label={arg.label}
                        checked={isSelected(arg)}
                        onChange={(checked, prop) => {
                            onChange(checked, arg);
                        }}
                    />
                </div>
            )
        })
    }

    const uiByType = () => {
        switch (type) {
            case 'string':
            case 'stringKey':
            case 'paragraph':
                return (
                    <StringFlags
                        preList={prelist}
                        onChange={(arg, vm) => {childChange(arg, vm)}}
                        configs={helpers.json.val(props, 'configs', {})}
                        details={helpers.json.val(props, 'details', {})}
                        selected={helpers.json.val(props, 'selected', [])}
                    />
                )
            break;
            case 'email' :
                return (
                    <EmailFlags 
                        preList={prelist}
                        onChange={(arg, vm) => {childChange(arg, vm)}}
                        configs={helpers.json.val(props, 'configs', {})}
                        details={helpers.json.val(props, 'details', {})}
                        selected={helpers.json.val(props, 'selected', [])}
                    />
                )
            break;
            case 'objectId':
                return (
                    <ObjectId 
                        preList={prelist}
                        onChange={(arg, vm) => {childChange(arg, vm)}}
                        configs={helpers.json.val(props, 'configs', {})}
                        details={helpers.json.val(props, 'details', {})}
                        selected={helpers.json.val(props, 'selected', [])}
                    />
                )
            break;
            case 'object':
                return (
                    <ObjectFlags 
                        preList={prelist}
                        onChange={(arg, vm) => {childChange(arg, vm)}}
                        configs={helpers.json.val(props, 'configs', {})}
                        details={helpers.json.val(props, 'details', {})}
                        selected={helpers.json.val(props, 'selected', [])}
                    />
                )
            break;
            case 'switch':
                return (
                    <SwitchFlags 
                        preList={prelist}
                        onChange={(arg, vm) => {childChange(arg, vm)}}
                        configs={helpers.json.val(props, 'configs', {})}
                        details={helpers.json.val(props, 'details', {})}
                        selected={helpers.json.val(props, 'selected', [])}
                    />
                )
            break;
            case 'number':
                return (
                    <NumberFlags
                        preList={prelist}
                        onChange={(arg, vm) => {childChange(arg, vm)}}
                        configs={helpers.json.val(props, 'configs', {})}
                        details={helpers.json.val(props, 'details', {})}
                        selected={helpers.json.val(props, 'selected', [])}
                    />
                )
            break;
            case 'date':
                return (
                    <DateFlags
                        preList={prelist} 
                        onChange={(arg, vm) => {childChange(arg, vm)}}
                        configs={helpers.json.val(props, 'configs', {})}
                        details={helpers.json.val(props, 'details', {})}
                        selected={helpers.json.val(props, 'selected', [])}
                    />
                )
            break;
            case 'boolean':
                return (
                    <BooleanFlags 
                        preList={prelist} 
                        onChange={(arg, vm) => {childChange(arg, vm)}}
                        configs={helpers.json.val(props, 'configs', {})}
                        details={helpers.json.val(props, 'details', {})}
                        selected={helpers.json.val(props, 'selected', [])}
                    />
                )
            break;
            default: 
                return <></>
        }
    }

    return (
        <>
            <div className='full bxs pd-t24'>
                {uiByType()}
            </div>
            <div className='full bxs flx-vc pd-t20'>
                {ui()}
            </div>
        </>
        
    )
}

export default GlobalFlags;