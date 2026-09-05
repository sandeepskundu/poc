import helpers from 'ui-helpers';
import Toggle from 'aio-global-ui/atoms/form/toggle';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const action = helpers.json.val(props, 'action', '');
    const details = helpers.json.val(props, 'details', {});
    const map = `actions.${action}`

    const onToggle = (checked) => {
        let d = helpers.json.copy(details);
            d = helpers.json.set(d, map, checked, false, true);

            if(props.onChange){
                props.onChange(d);
            }
    }

    const ui = () => {
        return (
            <Toggle
                checked={helpers.json.val(details, map)}
                onChange={(checked) => {onToggle(checked)}}
                label={helpers.string.transform.camelize(action)}
            />
        )
    }

    return ui();
}

export default Comp;