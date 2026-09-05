import helpers from 'ui-helpers';
import BooleanSwitch from 'aio-app-ui-tdc-application-atoms/boolean-switch';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const type = helpers.json.val(props, 'type.id', '');
    const details = helpers.json.val(props, 'details', {});
    const map = `appConfig.appExposedIn.${type}`;
    const value = helpers.json.val(details, map, '');

    const onChange = (checked) => {
        if(props.onChange){
            let d = helpers.json.copy(details);
                d = helpers.json.set(d, map, checked || false, false, true);
                props.onChange(d);
            }
    }

    const ui = () => {
        return (
            <BooleanSwitch
                checked={value}
                onChange={(e) => {onChange(e)}}
                label={`${helpers.string.transform.camelize(type)} enabled`}
            />
        )
    }

    return ui();
}

export default Comp;