import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import SelectBox from 'aio-app-ui-atoms/select-box';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const mapping = helpers.json.val(props, 'mapping', []);

    const prevopts = (pcur) => {
        let rval = {}
        let pl = helpers.json.val(props, 'prev', {});

        for(const a in pl){
            if(pl[a] && pl[a].id === pcur){
                rval = pl[a];
                break;
            }
        };

        return rval;
    }

    const getLabel = () => {
        const pcur = helpers.json.val(props, 'pcur');

        if(!pcur){
            return 'Select root'
        }else{
            const ps = prevopts(pcur);
            const lbl = helpers.json.val(ps, 'label', '');

            if(lbl){
                return `Child of > ${lbl}`;
            }else{
                return 'Select an option';
            }
        }
    }

    const shouldShow = () => {
        if(props.islast){
            const pcur = helpers.json.val(props, 'pcur');
            const ps = prevopts(pcur);

            return helpers.json.val(ps, 'hasChild', false);
        }else{
            return true;
        }
    }

    const onSelect = (arg) => {
        let map = [...mapping];
        let id = helpers.json.val(arg, 'id');

        if(id){
            map.push(id);

            if(props.onChange){
                props.onChange(map);
            }
        }
    }

    const ui = () => {
        if(shouldShow()){
            return (
                <SelectBox
                    noBlank={true}
                    list={props.list}
                    selected={props.selected}
                    selectBoxProps={{
                        label:getLabel(),
                        onSelect:(e, item) => {
                            onSelect(item);
                        }
                    }}
                />
            )
        }else{
            return <></>
        }
    }

    return ui();
}

export default Comp;