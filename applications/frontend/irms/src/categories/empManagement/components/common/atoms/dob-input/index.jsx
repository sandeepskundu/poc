import helpers from 'ui-helpers';
import DatePicker from 'aio-app-ui-atoms/date-picker';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = 'dob';
    const details = helpers.json.val(props, 'details', {});

    const onChange = (dt) => {
        if(dt){
            let d = helpers.json.copy(details);
                d = helpers.json.set(d, map, helpers.date.format(dt, '_yyyy-_m-_d'), false, true);

            if(props.onChange){
                props.onChange(d);   
            }
        }
    }

    const value = () => {
        let val = helpers.json.val(details, map, '');

        return val?(new Date(val)):null;
    }

    const ui = () => {
        return (
            <DatePicker
                selected    ={value()}
                onChange={(e) => {onChange(e)}}
                
                inputProps={{
                    label:'Date of birth',
                    validation:helpers.json.val(props, `validation.body.${map}`, {})
                }}
            />
        )
    }

    return ui();
}

export default Comp;