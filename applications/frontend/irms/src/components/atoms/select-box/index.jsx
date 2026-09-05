import helpers from 'ui-helpers';
import SelectBox from 'aio-global-ui/atoms/form/select-box';

const ThemeSelectBox = (props) => {
    let sel = {
        "id":"",
        "label":'Select'
    };

    let list = [sel];
    let dv = helpers.random.id(20);
    let ot = helpers.data.type.get(options);
    let sv = helpers.json.val(props, 'selected', dv);
    let options = helpers.json.val(props, 'list', {});
    let sbProps = helpers.json.val(props, 'selectBoxProps', {});
    let skey = helpers.json.val(props, 'selectBoxProps.keyMapping.selection', 'id');

    if(props.noBlank){
        sel = false;
        list = [];
    }
    
    for(const a in options){
        const item = options[a];

        if(item && (sv != dv) && (sv === item[skey])){
            sel = item;
        }

        list.push(item);
    }

    const ui = () => {
        return (
            <>
                <SelectBox 
                    {...sbProps}
                    selected={sel}
                    options={list}
                />
            </>
        )
    }

    return ui();
}

export default ThemeSelectBox;