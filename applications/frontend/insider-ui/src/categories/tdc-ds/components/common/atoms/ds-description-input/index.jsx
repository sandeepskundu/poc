import helpers from 'ui-helpers';
import Input from 'aio-global-ui/atoms/form/input';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = `description`;
    const details = helpers.json.val(props, 'details', {});
    const value = helpers.json.val(details, map, '');

    const onChange = (e) => {
        if(props.onChange){
            let d = helpers.json.copy(details);    
            let val = helpers.json.val(e, 'target.value', '');
                d = helpers.json.set(d, map, val, false, true);
                props.onChange(d);
        }
    }

    const ui = () => {
        return (
            <Input
                value={value}
                label='Description'
                onChange={(e) => {onChange(e)}}
            />
        )
    }

    return ui();
}

export default Comp;