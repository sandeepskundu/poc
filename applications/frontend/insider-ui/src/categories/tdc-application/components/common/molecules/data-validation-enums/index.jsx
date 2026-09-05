import helpers from 'ui-helpers';
import DataEnumsMapList from 'aio-app-ui-tdc-application-molecules/data-enums-map-list';
import ValidationReqValueBothSame from 'aio-app-ui-tdc-application-atoms/validation-req-value-both-same';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const validation = helpers.json.val(props, 'validation', {});
    const required =  helpers.json.val(props, 'validation.checks.enums', {});
    const bothsame = helpers.json.val(props, 'validation.checks.enums.bothAreSame');

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
            d = helpers.json.set(d, 'checks.enums.hashmap', true);

        if(type === 'both'){
            d = helpers.json.set(d, 'checks.enums.value', id);
            d = helpers.json.set(d, 'checks.enums.uivalue', id);
        }else{
            d = helpers.json.set(d, `checks.enums.${type}`, id);
        };

        onChangeCb(d);
    }

    const onToggle = (arg) => {
        let d = helpers.json.copy(validation);
                helpers.json.remove(d, 'checks.enums');
            d = helpers.json.set(d, 'checks.enums', arg);
            onChangeCb(d);
    }

    const options = () => {
        if(bothsame){
            return (
                <div className='full bxs'>
                    <DataEnumsMapList
                        valuemap="both"
                        type="Enums map"
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
                        <DataEnumsMapList
                            valuemap="uivalue"
                            type="UI enums map"
                            details={props.details}
                            configs={props.configs}
                            validation={validation}
                            mapping={props.mapping}
                            onChange={(arg) => {onSelect(arg, 'uivalue')}}
                            selected={helpers.json.val(required, 'uivalue')}
                        />
                    </div>
                    <div className='full bxs'>
                        <DataEnumsMapList
                            valuemap="value"
                            type="API enums map"
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
            <div className='full bxs grid-wrapper'>
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