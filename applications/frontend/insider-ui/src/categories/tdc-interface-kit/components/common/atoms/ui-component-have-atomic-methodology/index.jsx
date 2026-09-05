import helpers from 'ui-helpers';
import Toggle from 'aio-global-ui/atoms/form/toggle';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = 'hasAtomicChilds';
    const details = helpers.json.val(props, 'details', {});

    const onToggle = (checked) => {
        let d = helpers.json.copy(details);
            d.hasAtomicChilds = checked;

            if(props.onChange){
                props.onChange(d);
            }
    }

    const ui = () => {
        return (
            <Toggle
                label='Child have atomic methodology?'
                checked={helpers.json.val(details, map)}
                onChange={(checked) => {onToggle(checked)}}
            />
        )
    }

    return ui();
}

export default Comp;