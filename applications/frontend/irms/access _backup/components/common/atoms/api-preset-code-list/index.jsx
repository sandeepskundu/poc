import helpers from 'ui-helpers';
import appHelpers from 'app-helpers';
import SelectBox from 'aio-app-ui-atoms/select-box';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = 'code';
    const details = helpers.json.val(props, 'details', {});

    const onChange = (arg) => {
        let d = helpers.json.copy(details);
        let val = helpers.json.val(arg, 'id', '');
            delete d.departOrRoleHash;
            delete d.departOrRoleHashMap;
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
                list={helpers.json.val(appHelpers, 'constants.access.api.presets.code', {})}
                selectBoxProps={{
                    label:'Code',
                    onSelect:(e, item) => {
                        onChange(item);
                    },
                    labelProps:{
                        validation:helpers.json.val(props, 'validation.body.code', {})
                    }
                }}
            />
        )
    }

    return ui();
}

export default Comp;