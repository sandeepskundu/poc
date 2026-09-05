import helpers from 'ui-helpers';
import Input from 'aio-global-ui/atoms/form/input';
import SelectBox from 'aio-app-ui-atoms/select-box';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = 'type';
    const details = helpers.json.val(props, 'details', {});

    const onChange = (e, arg) => {
        let d = helpers.json.copy(details);
        let val = helpers.json.val(arg, 'id', '');
            d = helpers.json.set(d, map, val, false, true);

        if(props.onChange){
            props.onChange(d);   
        }
    }

    const ui = () => {
        return (
            <SelectBox
                noBlank={true}
                selected={helpers.json.val(details, 'type', '')}
                list={helpers.json.val(props, 'configs.enums.hierarchy.type', {})}
                selectBoxProps={{
                    label:'Type',
                    onSelect:onChange,
                    labelProps:{
                        //validation:getValidation(parseInt(i))
                    }
                }}
            />
        )
    }

    return ui();
}

export default Comp;