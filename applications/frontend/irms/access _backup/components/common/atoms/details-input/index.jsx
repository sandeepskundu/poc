import helpers from 'ui-helpers';
import Input from 'aio-global-ui/atoms/form/input';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = helpers.json.val(props, 'valuemap', '');
    const details = helpers.json.val(props, 'details', {});

    console.log(details);

    const onChange = (e) => {
        let d = helpers.json.copy(details);
        let val = helpers.json.val(e, 'target.value', '');
            d = helpers.json.set(d, map, val, false, true);

        if(props.onChange){
            props.onChange(d);   
        }
    }

    const ui = () => {
        return (
            <Input
                label={props.label || ''}
                onChange={(e) => {onChange(e)}}
                value={helpers.json.val(details, map, '')}
                validation={helpers.json.val(props, `validation.body.${map}`, {})}
            />
        )
    }

    return ui();
}

export default Comp;