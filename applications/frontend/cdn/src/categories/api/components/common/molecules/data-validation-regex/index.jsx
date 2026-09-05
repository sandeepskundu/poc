import React from 'react';
import helpers from 'ui-helpers';
import DataRegexMapList from 'aio-app-ui-api-molecules/data-regex-map-list';
import ValidationReqValueBothSame from 'aio-app-ui-api-atoms/validation-req-value-both-same';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const validation = helpers.json.val(props, 'validation', {});
    const required =  helpers.json.val(props, 'validation.checks.regex', {});
    const bothsame = helpers.json.val(props, 'validation.checks.regex.bothAreSame');

    const onChangeCb = (arg) => {
        let mapping = helpers.json.val(props, 'mapping', []);

            if(mapping && mapping.length > 0){
                mapping.pop();
            };

            if(props.onChange){
                props.onChange(arg, mapping.join('.'), true);
            }
    }

    const onSelect = (arg, type) => {
        let id = helpers.json.val(arg, 'id');
        let d = helpers.json.copy(validation);

        if(type === 'both'){
            d = helpers.json.set(d, 'checks.regex.value', id);
            d = helpers.json.set(d, 'checks.regex.uivalue', id);
        }else{
            d = helpers.json.set(d, `checks.regex.${type}`, id);
        };

        onChangeCb(d);
    }

    const onToggle = (arg) => {
        let d = helpers.json.copy(validation);
                helpers.json.remove(d, 'checks.regex');
            d = helpers.json.set(d, 'checks.regex', arg);
            onChangeCb(d);
    }

    const options = () => {
        if(bothsame){
            return (
                <div className='full bxs'>
                    <DataRegexMapList
                        valuemap="both"
                        type="Regex map"
                        details={props.details}
                        configs={props.configs}
                        validation={validation}
                        mapping={props.mapping}
                        onChange={(arg) => {onSelect(arg, 'both')}}
                        selected={helpers.json.val(required, 'value')}
                    />
                </div>
            )
        }else{
            return (
                <>
                    <div className='full bxs'>
                        <DataRegexMapList
                            valuemap="uivalue"
                            type="UI Regex map"
                            details={props.details}
                            configs={props.configs}
                            validation={validation}
                            mapping={props.mapping}
                            onChange={(arg) => {onSelect(arg, 'uivalue')}}
                            selected={helpers.json.val(required, 'uivalue')}
                        />
                    </div>
                    <div className='full bxs'>
                        <DataRegexMapList
                            valuemap="value"
                            type="API Regex map"
                            details={props.details}
                            configs={props.configs}
                            validation={validation}
                            mapping={props.mapping}
                            onChange={(arg) => {onSelect(arg, 'value')}}
                            selected={helpers.json.val(required, 'value')}
                        />
                    </div>
                </>
            )
        }
    }

    const ui = () => {
        return (
            <div className='full bxs grid-wrapper bdr-c00104 bdr-1 bdr-wrln bdr-wbn'>
                <div className='full bxs pd-b30 pd-t12'>
                    <ValidationReqValueBothSame
                        required={required}
                        details={props.details}
                        configs={props.configs}
                        validation={validation}
                        onChange={(arg) => {onToggle(arg)}}
                    />
                </div>
                {options()}
            </div>
        )
    }

    return ui();
}

export default Comp;