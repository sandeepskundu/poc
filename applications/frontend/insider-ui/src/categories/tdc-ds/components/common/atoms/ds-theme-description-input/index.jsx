import helpers from 'ui-helpers';
import Input from 'aio-global-ui/atoms/form/input';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = `data.theme.modified.description`;
    const details = helpers.json.val(props, 'details', {});
    const value = helpers.json.val(details, map, '');

    const onChange = (e) => {
        if(props.onDetailsChange){
            props.onDetailsChange(helpers.json.val(e, 'target.value', ''), map);
        }
    }

    const ui = () => {
        return (
            <Input
                value={value}
                label='Theme description'
                onChange={(e) => {onChange(e)}}
            />
        )
    }

    return ui();
}

export default Comp;