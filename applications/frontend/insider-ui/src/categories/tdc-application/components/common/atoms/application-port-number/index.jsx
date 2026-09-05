import helpers from 'ui-helpers';
import Input from 'aio-global-ui/atoms/form/input';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const type = helpers.json.val(props, 'type.id', '');
    const details = helpers.json.val(props, 'details', {});
    const map = `appConfig.ports.${type}`;
    const value = helpers.json.val(details, map, '');

    const onChange = (e) => {
        if(props.onChange){
            let d = helpers.json.copy(details);
            let val = helpers.json.val(e, 'target.value', '');
                val = parseInt(val || 0);
                d = helpers.json.set(d, map, val || '', false, true);
                props.onChange(d);
            }
    }

    const ui = () => {
        return (
            <Input
                value={value}
                pattern="number"
                onChange={(e) => {onChange(e)}}
                label={`${helpers.string.transform.camelize(type)} port`}
            />
        )
    }

    return ui();
}

export default Comp;