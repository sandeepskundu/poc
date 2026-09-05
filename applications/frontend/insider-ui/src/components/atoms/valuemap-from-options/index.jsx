import helpers from 'ui-helpers';
import SelectBox from 'aio-app-ui-atoms/select-box';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = 'from';
    const details = helpers.json.val(props, 'details', {});
    const current = helpers.json.val(props, 'details.from', '');

    const options = {
        0:{
            id:'query',
            label:'Query'
        },
        1:{
            id:'params',
            label:'Params'
        },
        2:{
            id:'body',
            label:'Body'
        },
        3:{
            id:'props',
            label:'Props'
        },
        4:{
            id:'data',
            label:'Data'
        },
    }

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
                    label:'Exposed',
                    onSelect:onSelect
                }}
            />
        )
    }

    return ui();
}

export default Comp;