import helpers from 'ui-helpers';
import Input from 'aio-global-ui/atoms/form/input';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = 'map';
    const details = helpers.json.val(props, 'details', {});

    const onChange = (e) => {
        let d = helpers.json.copy(details);
        let val = helpers.json.val(e, 'target.value', '');
            val = helpers.string.remove.space(val);
            d = helpers.json.set(d, map, val, false, true);

            if(props.onChange){
                props.onChange(d);   
            }
    }

    const ui = () => {
        return (
            <Input
                label='Value map'
                onChange={(e) => {onChange(e)}}
                value={helpers.json.val(details, map, '')}
            />
        )
    }

    return ui();
}

export default Comp;