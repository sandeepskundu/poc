import React from 'react';
import helpers from 'ui-helpers';
import ParentChildMap from 'aio-app-ui-organisms/parent-child-map';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const name = helpers.json.val(props, 'name', '')
    const data = helpers.json.val(props, 'data', {});

    const onChange = (valmap) => {
        let d = helpers.json.copy(data);
            delete d[name];
            d[name] = valmap;
        
            if(props.onChange){
                props.onChange(d);
            }
    }

    const value = () => {
        return helpers.json.val(data, name, '')
    }

    const ui = () => {
        return (
            <ParentChildMap 
                name={name}
                selected={value()}
                details={props.details}
                configs={props.configs}
                onChange={(valmap) => {onChange(valmap)}}
                apiConfig={{
                    "rootId":'67e640d2601ba8c6b57114a2',
                    "url":{
                        root:"http://localhost:1300/cdn/gUtilsApi/siteprops/:_id_:",
                        child:'http://localhost:1300/cdn/gUtilsApi/siteprops/:_id_:'
                    },
                }}
            />
        )
    }

    return ui();
}

export default Comp;