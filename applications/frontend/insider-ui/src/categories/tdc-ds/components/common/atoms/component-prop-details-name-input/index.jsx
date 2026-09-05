import helpers from 'ui-helpers';
import Input from 'aio-global-ui/atoms/form/input';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const key = 'name'
    const details = helpers.json.val(props, 'details', {});
    const mapping = helpers.json.val(props, 'mapping', '');
    const map = (mapping?`${mapping}.${key}`:key);

    const onChange = (e) => {
        let d = helpers.json.copy(details);
        let val = helpers.json.val(e, 'target.value', '');
            val = helpers.string.remove.space(val);
            val = helpers.string.remove.other.than.nonalphaAndHyphen(val);
            d = helpers.json.set(d, map, val, false, true);
            props.onChange(d);
    }

    const ui = () => {
        return (
            <Input
                label='Prop name'
                onBlur={(e) => {onChange(e)}}
                value={helpers.json.val(details, map, '')}
            />
        )
    }

    return ui();
}

export default Comp;