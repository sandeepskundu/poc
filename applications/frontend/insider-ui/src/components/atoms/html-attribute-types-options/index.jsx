import helpers from 'ui-helpers';
import SelectBox from 'aio-app-ui-atoms/select-box';

const PropTypes = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = 'type';
    const details = helpers.json.val(props, 'data', {});
    const options = helpers.json.val(props, 'configs.attrsValueTypes', {});

    const onChange = (el, arg, i) => {
        let d = helpers.json.copy(details);
            d = helpers.json.set(details, map, arg.id);
            helpers.json.remove(d, 'valuemap');

            if(props.onUpdate){
                props.onUpdate(d);
            }
    }

    return (
        <SelectBox 
            list={options}
            noBlank={true}
            selected={helpers.json.val(details, map, '')} 
            selectBoxProps={{
                onSelect:onChange,
                "label":"Prop type",
            }}
        />
    )
}

export default PropTypes;