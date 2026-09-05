import helpers from 'ui-helpers';
import appHelpers from 'app-helpers';
import SelectBox from 'aio-app-ui-atoms/select-box';
import React, {useState, useEffect, useRef} from 'react';

const PropTypes = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = 'id';
    const [options, setOptions] = useState({});
    const details = helpers.json.val(props, 'details.collection', {});
    const selected =  helpers.json.val(details, map, '');
    const fristRender = helpers.react.state.frist(useRef(true), useEffect)();

    const onSelect = (e, arg) => {
        let d = helpers.json.copy(details);
        let id = helpers.json.val(arg, 'id', '');
        if(props.onChange){
            props.onChange(helpers.json.set(d, map, id, false, false));   
        }
    }

    const onResp = (resp, arg) => {
        const rv = {};
        const li = helpers.json.val(resp, 'collections', []);

        for(const a in li){
            rv[a] = {
                id:helpers.json.val(li[a], 'id'),
                label:helpers.json.val(li[a], 'name')
            }
        }

        setOptions(rv);
    }

    if(fristRender){
        appHelpers.store.get({
            name:'collectionListByDbId',
            request:{
                request:{
                    params:{
                        dbId:helpers.json.val(props, 'details.dbId', '')
                    }
                }
            }
        }, onResp);
    }

    return (
        <SelectBox 
            list={options}
            noBlank={true}
            selected={selected} 
            selectBoxProps={{
                onSelect:onSelect,
                "label":"Select collection",
            }}
        />
    )
}

export default PropTypes;