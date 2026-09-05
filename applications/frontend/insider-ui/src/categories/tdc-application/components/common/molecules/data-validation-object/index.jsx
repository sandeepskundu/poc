import helpers from 'ui-helpers';
import ValidationReqValueBothSame from 'aio-app-ui-tdc-application-atoms/validation-req-value-both-same'
import ValidationCheckObjectOptions from 'aio-app-ui-tdc-application-atoms/validation-checks-object-options'

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const validation = helpers.json.val(props, 'validation', {});
    const required =  helpers.json.val(props, 'validation.checks.object', {});
    const bothsame = helpers.json.val(props, 'validation.checks.object.bothAreSame');

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
            d = helpers.json.set(d, 'checks.object.value', id);
            d = helpers.json.set(d, 'checks.object.uivalue', id);
        }else{
            d = helpers.json.set(d, `checks.object.${type}`, id);
        };

        onChangeCb(d);
    }

    const onToggle = (arg) => {
        let d = helpers.json.copy(validation);
                helpers.json.remove(d, 'checks.object');
            d = helpers.json.set(d, 'checks.object', arg);
            onChangeCb(d);
    }

    const options = () => {
        if(bothsame){
            return (
                <li className='grid-w2 pd-r16'>
                    <ValidationCheckObjectOptions
                        details={props.details}
                        configs={props.configs}
                        validation={validation}
                        label="Required type"
                        onChange={(arg) => {onSelect(arg, 'both')}}
                        selected={helpers.json.val(required, 'value')}
                    />
                </li>
            )
        }else{
            return (
                <>
                    <li className='grid-w2 pd-r16'>
                        <ValidationCheckObjectOptions
                            details={props.details}
                            configs={props.configs}
                            validation={validation}
                            label="UI Required type"
                            onChange={(arg) => {onSelect(arg, 'uivalue')}}
                            selected={helpers.json.val(required, 'uivalue')}
                        />
                    </li>
                    <li className='grid-w2 pd-l16'>
                        <ValidationCheckObjectOptions
                            details={props.details}
                            configs={props.configs}
                            validation={validation}
                            label="API Required type"
                            onChange={(arg) => {onSelect(arg, 'value')}}
                            selected={helpers.json.val(required, 'value')}
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