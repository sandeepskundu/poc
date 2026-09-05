import helpers from 'ui-helpers';
import SelectBox from 'aio-app-ui-atoms/select-box';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = 'value';
    const details = helpers.json.val(props, 'details.default', {});
    const current = helpers.json.val(props, 'details.default.value', false);

    const options = {
        0:{
            'id':true,
            'label':"True"
        },
        2:{
            'id':false,
            'label':'False'
        }
    }

    const onSelect = (e, arg) => {
        let id = helpers.json.val(arg, 'id');
        let d = helpers.json.copy(details);
            d = helpers.json.set(d, map, id, false, true);

        if(props.onChange){
            props.onChange(d);   
        }
    }

    const ui = () => {
        return (
            <SelectBox
                noBlank={true}
                list={options}
                selected={current}
                selectBoxProps={{
                    label:'Exposed',
                    onSelect:onSelect
                }}
                keyMapping={{
                    selection:'id'
                }}
            />
        )
    }

    return ui();
}

export default Comp;