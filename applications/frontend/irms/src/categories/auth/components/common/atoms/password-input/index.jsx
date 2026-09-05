import helpers from 'ui-helpers';
import Input from 'aio-global-ui/atoms/form/input';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const details = helpers.json.val(props, 'details', {});
    const map = helpers.json.val(props, 'mapnode', 'password');

    const onChange = (e) => {
        let d = helpers.json.copy(details);
        let val = helpers.json.val(e, 'target.value', '');
            d = helpers.json.set(d, map, val, false, true);

        if(props.onChange){
            props.onChange(d);   
        }
    }

    const label = () => {
        return helpers.json.val(props, 'label', 'Password')
    }

    const ui = () => {
        return (
            <Input
                type="password"
                label={label()}
                onChange={(e) => {onChange(e)}}
                value={helpers.json.val(details, map, '')}
                validation={helpers.json.val(props, `validation.body.${map}`, {})}
            />
        )
    }

    return ui();
}

export default Comp;