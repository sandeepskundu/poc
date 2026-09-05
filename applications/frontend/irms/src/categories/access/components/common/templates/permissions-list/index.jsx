import helpers from 'ui-helpers';
import {useEffect, useState, useRef} from 'react';
import MapListUi from 'aio-app-ui-access-organisms/map-list-ui';
import PermissionsListHeader from 'aio-app-ui-access-organisms/permissions-list-header';

const Comp = (props) => {
    const dvals = {
        blank:true,
        configs:{ }
    }

    let dv = dvals;

    const [data, setData] = useState(dvals);
    const [cache, setCache] = useState(helpers.random.id(16))
    const id = helpers.json.val(_siteProps_, 'router.params.id', '');
    const mId = helpers.json.val(_siteProps_, 'router.params.mId', '');
    const fristRender = helpers.react.state.frist(useRef(true), useEffect)();

    const onResp = (resp) => {
        let d = helpers.json.copy(data);
            d.configs = dv.configs;
            d.results = helpers.json.val(resp, 'results', []);
            d.blank = false;
            setData(d);
            setCache(helpers.random.id(16))
    }

    const request = (name, id, to, rmap, rfb) => {
        return {
            name:name,
            request:{
                options:{},
                request:{
                    method:'get',
                    params:{
                        id:id
                    }
                },
                dataMaker:(data, rawResp, configs, error) => {
                    return helpers.json.val(data, rmap, rfb);
                },
                responseDataMap:{
                    "fallback":{},
                    "from":"data",
                    "to":to || "results",
                },
            }
        };
    }

     const onConstResp = (res) => {
        dv.configs = res || {};
        let li = [
            request('access.map.getByMapId', mId, 'results', 'data.result', []),
            
        ];

        if(id){
            li.push(request('access.preset.getByMapId', id, 'presets', 'data.result', [])),
            li.push(request('access.map.getById', id, 'details', 'data.result.0', {}))
        }

        helpers.store.getDetailsById(li, onResp);
    }

    if(fristRender){
        helpers.store.getConstants({
            request:{
                data:{
                    includes:{
                        "access.actions.types.all":true
                    }
                }
            },
            dataMakers:{}
        }, onConstResp);
    }

    return (
        <>
            <PermissionsListHeader {...props} {...data} />
            <MapListUi {...props} {...data} key={cache} />
        </>
    )
}

export default Comp 