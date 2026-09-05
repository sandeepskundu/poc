import helpers from 'ui-helpers';
import Input from 'aio-global-ui/atoms/form/input';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = 'appName';
    const details = helpers.json.val(props, 'details');

    const onChange = (e) => {
        const d = helpers.json.copy(details);
        if(props.onChange){
            d[map] = helpers.json.val(e, 'target.value', '');
            props.onChange(d);   
        }
    }

    const ui = () => {
        return (
            <Input
                label='Application name'
                onChange={(e) => {onChange(e)}}
                value={helpers.json.val(details, map, '')}
            />
        )
    }

    return ui();
}

export default Comp;