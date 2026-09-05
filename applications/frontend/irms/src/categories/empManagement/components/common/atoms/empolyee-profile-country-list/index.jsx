import helpers from 'ui-helpers';
import SelectBox from 'aio-app-ui-atoms/select-box';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = 'country';
    const details = helpers.json.val(props, 'details', {});
    
    const onChange = (arg) => {
        let d = helpers.json.copy(details);
        let val = helpers.json.val(arg, 'iso3', '');
            d = helpers.json.set(d, map, val, false, true);

        if(props.onChange){
            props.onChange(d);   
        }
    }
    
    const ui = () => {
        return (
            <SelectBox
                noBlank={true}
                selected={helpers.json.val(details, map, '')}
                list={helpers.json.val(props, 'configs.country.list', [])}
                selectBoxProps={{
                    keyMapping:{
                        label:"name",
                        selection:"iso3"
                    },
                    label:'Country',
                    onSelect:(e, item) => {
                        onChange(item);
                    },
                    labelProps:{
                        validation:helpers.json.val(props, 'validation.body.country', {})
                    }
                }}
            />
        )
    }

    return ui();
}

export default Comp;