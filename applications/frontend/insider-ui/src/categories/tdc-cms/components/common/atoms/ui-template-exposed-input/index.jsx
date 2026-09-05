import helpers from 'ui-helpers';
import SelectBox from 'aio-app-ui-atoms/select-box';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = 'exposed';
    const details = helpers.json.val(props, 'details', {});
    const options = helpers.json.val(props, 'configs.exposed.options', {});
    const current = helpers.json.val(props, 'details.exposed', 'internally');

    const onSelect = (e, arg) => {
        let id = helpers.json.val(arg, 'id');
        let d = helpers.json.copy(details);
            d = helpers.json.set(d, map, id);

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
                    onSelect:onSelect,
                    label:'Exposed',
                }}
            />
        )
    }

    return ui();
}

export default Comp;