
import helpers from 'ui-helpers';
import Toggle from 'aio-global-ui/atoms/form/toggle';
import React, {useEffect, useState, useRef} from 'react';

const ValidationDetailsMapper = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const options = {
        map:{
            _id:{
                enable:true,
                valueType:"objectId"
            },
            _userId:{
                enable:true,
                valueType:"objectId"
            },
            _mapId:{
                enable:true,
                valueType:"objectId"
            },
            _merchantId:{
                enable:true,
                valueType:"objectId"
            }
        },
        list:[
            {
                id:"_id",
                label:"Item Id"
            }, {
                id:"_userId",
                label:"User Id"
            }, {
                id:"_mapId",
                label:"Map Id"
            }, {
                id:"_merchantId",
                label:"Merchant Id"
            }
        ]
    }

    const map = (arg) => {
        return `creation.nodes.${helpers.json.val(arg, 'id')}`;
    }
    
    const onChange = (checked, arg) => {
        let id = helpers.json.val(arg, 'id');
        let d = helpers.json.val(props, 'modified.creation.nodes', {});
            d = helpers.json.copy(d);

            if(checked){
                let di = helpers.json.val(options, `map.${id}`);
                    if(di){
                        d = helpers.json.set(d, id, di);
                    } 
            }else{
                helpers.json.remove(d, id);
            }

            if(props.onChange){
                props.onChange(d);
            }
    }

    const enabled = (arg) => {
        return helpers.json.val(props, `modified.${map(arg)}.enable`);
    }

    const list = () => {
        let li = helpers.json.val(options, 'list', []);

        if(li && li.length > 0){
            return li.map((arg, i) => {
                return (
                    <li className='grid pd-r20 bxs' key={i}>
                        <Toggle 
                            label={arg.label}
                            checked={enabled(arg)}
                            onChange={(checked) => {
                                onChange(checked, arg);
                            }}
                        />
                    </li>
                )
            })
        }
        
    }

    const ui = () => {
        return (
            <ul className='full bxs grid-wrapper grid-layout-6 pd-t20'>
                {list()}
            </ul>
        )
    }

    return ui();
}


export default ValidationDetailsMapper;