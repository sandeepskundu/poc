import helpers from 'ui-helpers';
import appHelpers from 'app-helpers';
import SelectBox from 'aio-app-ui-atoms/select-box';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = helpers.json.val(props, 'valuemap');
    const details = helpers.json.val(props, 'details', {});
    const sprops = helpers.json.merge({
        onSelect:(e, item) => {
            onChange(item);
        },
        labelProps:{
            validation:helpers.json.val(props, `validation.body.${map}`, {})
        }
    }, props.selectBoxProps || {})
    const selkey = helpers.json.val(sprops, 'keyMapping.selection', 'id');

    console.log(helpers.json.val(props, props.optionmap, {}))

    const onChange = (arg) => {
        let d = helpers.json.copy(details);
        let val = helpers.json.val(arg, selkey, '');
            d = helpers.json.set(d, map, val, false, true);

        if(props.onChange){
            props.onChange(d);   
        }
    }

    const ui = () => {
        return (
            <SelectBox
                noBlank={true}
                selectBoxProps={sprops}
                selected={helpers.json.val(details, map, '')}
                list={helpers.json.val(props, props.optionmap, {})}
            />
        )
    }

    return ui();
}

export default Comp;