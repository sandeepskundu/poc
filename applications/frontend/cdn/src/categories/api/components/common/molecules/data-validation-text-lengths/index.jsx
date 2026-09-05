import React from 'react';
import helpers from 'ui-helpers';
import Input from 'aio-global-ui/atoms/form/input';
import ValidationReqValueBothSame from 'aio-app-ui-api-atoms/validation-req-value-both-same';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const validation = helpers.json.val(props, 'validation', {});
    const required =  helpers.json.val(props, 'validation.checks.lengths', {});
    const bothsame = helpers.json.val(props, 'validation.checks.lengths.bothAreSame');

    const onChangeCb = (arg) => {
        let mapping = helpers.json.val(props, 'mapping', []);

            if(mapping && mapping.length > 0){
                mapping.pop();
            };

            if(props.onChange){
                props.onChange(arg, mapping.join('.'), true);
            }
    }

    const onToggle = (arg) => {
        let d = helpers.json.copy(validation);
                helpers.json.remove(d, 'checks.lengths');
            d = helpers.json.set(d, 'checks.lengths', arg);
            onChangeCb(d);
    }

    const refine = (val) => {
        let rv = [];
        let v = helpers.string.remove.space(val);

        if(v){
            v = v.split(',');
            for(const a in v){
                if(v[a]){
                    rv.push(parseInt(v[a]));
                }
            }
        }

        return rv;
    }

    const onChange = (e, type) => {
        let d = helpers.json.copy(validation);
        let val = helpers.json.val(e, 'target.value', '');
            val = helpers.string.remove.other.than.commaAndNumber(val);
            e.target.value = val;

            if(val){
                val = refine(val);
            }else{
                val = [];
            }
            
            if(type === 'both'){
                d = helpers.json.set(d, 'checks.lengths.value', val);
                d = helpers.json.set(d, 'checks.lengths.uivalue', val);
            }else{
                d = helpers.json.set(d, `checks.lengths.${type}`, val);
            };

            onChangeCb(d);
    }

    const value = (type) => {
        let rv = helpers.json.val(required, type, []);
            return rv.join(',')
    }

    const options = () => {
        if(bothsame){
            return (
                <li className='grid-w2 pd-r16'>
                    <Input
                        value={value('value')}
                        label={'All possible lenghts'}
                        onChange={(e) => {onChange(e, 'both')}}
                        
                    />
                </li>
            )
        }else{
            return (
                <>
                    <li className='grid-w3 pd-r16'>
                        <Input
                            value={value('uivalue')}
                            label={'All possible lenghts on UI'}
                            onChange={(e) => {onChange(e, 'uivalue')}}
                        />
                    </li>
                    <li className='grid-w3 pd-l16'>
                        <Input
                            value={value('value')}
                            label={'All possible lenghts at API'}
                            onChange={(e) => {onChange(e, 'value')}}
                            
                        />
                    </li>
                </>
            )
        }
    }

    const ui = () => {
        return (
            <div className='full bxs grid-wrapper bdr-c00104 bdr-1 bdr-wrln bdr-wbn'>
                <ul className='full bxs grid-wrapper flx-vc pd-b30 pd-t16'>
                    <li className='grid-w3'>
                        <ValidationReqValueBothSame
                            resetValue={[]}
                            required={required}
                            details={props.details}
                            configs={props.configs}
                            validation={validation}
                            onChange={(arg) => {onToggle(arg)}}
                        />
                    </li>
                    {options()}
                </ul>
            </div>
        )
    }

    return ui();
}

export default Comp;