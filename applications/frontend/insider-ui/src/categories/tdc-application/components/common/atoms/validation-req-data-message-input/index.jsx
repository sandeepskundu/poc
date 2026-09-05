import helpers from 'ui-helpers';
import Input from 'aio-global-ui/atoms/form/input';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = helpers.json.val(props, 'map', '');
    const messages = helpers.json.val(props, 'messages', {});

    const onChange = (e) => {
        let d = helpers.json.copy(messages);
        let val = helpers.json.val(e, 'target.value', '');
            d = helpers.json.set(d, map, val, false, true);

            if(props.onChange){
                props.onChange(d);   
            }
    }

    const ui = () => {
        return (
            <Input
                label={props.label}
                onChange={(e) => {onChange(e)}}
                value={helpers.json.val(messages, map, '')}
            />
        )
    }

    return ui();
}

export default Comp;