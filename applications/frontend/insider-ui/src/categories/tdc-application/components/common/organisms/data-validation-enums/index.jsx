import helpers from 'ui-helpers';
import DataValidationEnums from 'aio-app-ui-tdc-application-molecules/data-validation-enums';
import ValidationReqDataMessages from 'aio-app-ui-tdc-application-molecules/validation-req-data-messages';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const validation = helpers.json.val(props, 'validation', {});

    const onChangeCb = (arg) => {
        let mapping = helpers.json.val(props, 'mapping', []);

            if(mapping && mapping.length > 0){
                mapping.pop();
            };

            if(props.onChange){
                props.onChange(arg, mapping.join('.'), true);
            }
    }

    const onChange = (arg, map, reset) => {
        let d = helpers.json.copy(validation);

            if(reset && map){
                helpers.json.remove(d, map)
            }

            d = helpers.json.set(d, map, arg);

            onChangeCb(d);
    }

    const ui = () => {
        return (
            <div className='full bxs grid-wrapper pd-rl10'>
                <div className='full'>
                    <DataValidationEnums
                        details={props.details}
                        configs={props.configs}
                        validation={validation}
                        mapping={props.mapping}
                        onChange={props.onChange}
                    />
                </div>
                <div className='full'>
                    <ValidationReqDataMessages 
                        details={props.details}
                        configs={props.configs}
                        validation={validation}
                        check={helpers.json.val(props, 'type.id')}
                        onChange={(arg, map, reset) => {onChange(arg, map, reset)}}
                    />
                </div>
            </div>
        )
    }

    return ui();
}

export default Comp;