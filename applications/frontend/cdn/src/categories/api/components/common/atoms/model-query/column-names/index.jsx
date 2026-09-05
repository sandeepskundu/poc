import helpers from 'ui-helpers';
import mhelpers from 'aio-app-ui-api-modules';
import React, {useState, useEffect} from 'react';
import SelectBox from 'aio-app-ui-atoms/select-box';

const ColumnNames = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const current = helpers.json.val(props, 'query.cloumn');

    const options = (() => {
        let rv = [];
        let cols = helpers.json.val(props, 'details.dbDetails.columns', {});

        for(const a in cols){
            let iv = {
                id:a,
                label:a
            }
            let item = cols[a];

            if(item.label){
                iv.label = item.label;
            }

            rv.push(iv);
        }

        return rv;
    })();

    const onSelect = (e, arg) => {
        let id = helpers.json.val(arg, 'id');
        let d = helpers.json.val(props, 'query', {});
            d = helpers.json.copy(d);
            d = helpers.json.set(d, 'cloumn', id);
            d.value = {};
            d.operation = {};
        
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
                    "label":"Select Column",
                }}
            />
        )
    }

    return ui();
}

export default ColumnNames;