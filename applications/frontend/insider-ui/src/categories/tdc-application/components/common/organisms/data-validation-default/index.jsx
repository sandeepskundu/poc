import helpers from 'ui-helpers';
import ValidationReqDataValueMap from 'aio-app-ui-tdc-application-molecules/validation-req-data-valuemap';
import ValidationReqDataMessages from 'aio-app-ui-tdc-application-molecules/validation-req-data-messages';
import ValidationReqDataCheckOptions from 'aio-app-ui-tdc-application-atoms/validation-req-data-check-options'

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
            <div className='full bxs grid-wrapper bdr-c00104 bdr-1 bdr-wrln bdr-wbn pd-rl10'>
                <div className='full bxs pd-b30'>
                    <ValidationReqDataValueMap
                        details={props.details}
                        configs={props.configs}
                        validation={validation}
                        onChange={(arg, map, reset) => {onChange(arg, map, reset)}}
                    />
                </div>
                <div className='full'>
                    <ValidationReqDataMessages 
                        details={props.details}
                        configs={props.configs}
                        validation={validation}
                        onChange={(arg, map, reset) => {onChange(arg, map, reset)}}
                    />
                </div> 
                <div className='grid-w2 hide'>
                    <ValidationReqDataCheckOptions 
                        details={props.details}
                        configs={props.configs}
                        validation={validation}
                        onChange={(arg, map) => {onChange(arg, map)}}
                    />
                </div>
            </div>
        )
    }

    return ui();
}

export default Comp;