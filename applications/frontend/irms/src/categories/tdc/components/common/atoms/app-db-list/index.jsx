import helpers from 'ui-helpers';
import {useState, useEffect, useRef} from 'react';
import SelectBox from 'aio-app-ui-atoms/select-box';

const PropTypes = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = 'appConfig.dbConfigs.dbId';

    const [options, setOptions] = useState({
        0:{
            id:"69342fdcf34fc46fc1ca75e1",
            label:"Sample db"
        }
    });

    const selected =  helpers.json.val(props.details, map, '');
    const fristRender = helpers.react.state.frist(useRef(true), useEffect)();

    const onSelect = (e, arg) => {
        let d = helpers.json.copy(props.details);
        let id = helpers.json.val(arg, 'id', '');
            d = helpers.json.set(d, map, id, false, false);


        if(props.onChange){
            props.onChange(d);   
        }
    }

    const onResp = (resp, arg) => {
        const rv = {};
        const li = helpers.json.val(resp, 'databases', []);

        for(const a in li){
            rv[a] = {
                id:helpers.json.val(li[a], 'id'),
                label:helpers.json.val(li[a], 'name')
            }
        }

        setOptions(rv);
    }

    if(fristRender){
        //appHelpers.store.get({name:'databaseListByMarchent'}, onResp);
    }

    return (
        <SelectBox 
            list={options}
            noBlank={true}
            selected={selected} 
            selectBoxProps={{
                onSelect:onSelect,
                "label":"Select database",
            }}
        />
    )
}

export default PropTypes;