import helpers from 'ui-helpers';
import Input from 'aio-global-ui/atoms/form/input';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = `data.theme.modified.code`;
    const details = helpers.json.val(props, 'details', {});
    const value = helpers.json.val(details, map, '');

    const onChange = (e) => {
        if(props.onDetailsChange){
            let val = helpers.json.val(e, 'target.value', '');
                val = helpers.string.remove.other.than.nonalphaAndHyphen(val);
                props.onDetailsChange(val, map);
        }
    }

    const ui = () => {
        return (
            <Input
                value={value}
                label='Theme code'
                onChange={(e) => {onChange(e)}}
            />
        )
    }

    return ui();
}

export default Comp;