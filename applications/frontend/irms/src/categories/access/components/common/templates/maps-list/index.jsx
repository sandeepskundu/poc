import helpers from 'ui-helpers';
import {useEffect, useState, useRef} from 'react';
import MapListUi from 'aio-app-ui-access-organisms/map-list-ui';
import PresetListUi from 'aio-app-ui-access-templates/preset-list';
import MapListHeader from 'aio-app-ui-access-organisms/map-list-header';

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
    const type = helpers.json.val(_siteProps_, 'router.params.type', '');
    const action = helpers.json.val(_siteProps_, 'router.params.action', '');
    const fristRender = helpers.react.state.frist(useRef(true), useEffect)();

    const onResp = (resp) => {
        let d = helpers.json.copy(data);
            d.configs = dv.configs;
            d.presets = helpers.json.val(resp, 'presets', []);
            d.results = helpers.json.val(resp, 'results', []);
            d.details = helpers.json.val(resp, 'details', {});
            d.parent = helpers.json.val(resp, 'details', {});
            d.blank = false;
            setData(d);
            setCache(helpers.random.id(16))
    }

    const request = (name, params, to, rmap, rfb) => {
        return {
            name:name,
            request:{
                options:{},
                request:{
                    method:'get',
                    params:params
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
            request('access.map.getByMapIdAndType', {id:mId, type:type}, 'results', 'data.result', []),
            
        ];

        if(id){
            li.push(request('access.preset.getByMapId', {id:id}, 'presets', 'data.result', [])),
            li.push(request('access.map.getById', {id:id}, 'details', 'data.result.0', {}))
        }

        helpers.store.getDetailsById(li, onResp);
    }

    if(fristRender){
        helpers.store.getConstants({
            request:{
                data:{
                    includes:{
                        "access.map.types.all":true,
                        "access.actions.types.all":true,
                        "access.actions.permission.type.all":true,
                        "enums.mappingLastIndexVal.optional":true,
                        "enums.mappingLastIndexVal.required":true,
                    }
                }
            },
            dataMakers:{}
        }, onConstResp);
    }

    return (
        <>
            <MapListHeader {...props} {...data} />
            <MapListUi {...props} {...data} key={cache} />
            {action === 'update'?<PresetListUi {...props} {...data} />:<></>}
        </>
    )
}

export default Comp 