import helpers from 'ui-helpers';
import Input from 'aio-global-ui/atoms/form/input';

const Comp = (dprops) => {
    let props = helpers.element.jsx.props.define({}, dprops);

    let details = helpers.json.val(props, 'data', {});


    const onChange = (e) => {
        let val = helpers.json.val(e, 'target.value', '');

        if(props.onChange){
            props.onChange(val);
        }
    }

    return (
        <Input 
            value={''}
            label="Description"
            onBlur={(e) => {onChange(e)}}
        />
    )
}

export default Comp;