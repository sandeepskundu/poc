import helpers from 'ui-helpers';
import {useEffect, useState, useRef} from 'react';
import PresetListUi from 'aio-app-ui-access-organisms/preset-list-ui';
import PresetListHeader from 'aio-app-ui-access-organisms/preset-list-header';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(20);
    const page = helpers.json.val(_siteProps_, 'router.view.page', '');
    const cate = helpers.json.val(_siteProps_, 'router.view.category', '');
    const [cache, setCache] = useState(id);
    const [data, setData] = useState({...props});
    const fristRender = helpers.react.state.frist(useRef(true), useEffect)();

    let dv = {...props};

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
                    "to":to || "results"
                }
            }
        };
    }

    const onResp = (resp) => {
        let d = helpers.json.copy(data);
            d.configs = dv.configs;
            d.parent = helpers.json.val(resp, 'parent', {});
            d.details = helpers.json.val(resp, 'details', {});
            d.blank = false;
            setData(d);
            setCache(helpers.random.id(16))
    }

    const onConstResp = (res) => {
        dv.configs = res || {};
        helpers.store.getDetailsById([
            request('access.map.getById', helpers.json.val(_siteProps_, 'router.params.accessMapId', ''), 'parent', 'data.result.0', {}),
            request('access.preset.getById', helpers.json.val(_siteProps_, 'router.params.presetId', ''), 'details', 'data.result.0', {})
        ], onResp);
    }


    if(fristRender && page === 'preset' && cate === 'access'){
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

    const ui = () => {
        if(page === 'preset' && cate === 'access'){
            return (
                <>
                    <PresetListHeader {...data} />
                    <PresetListUi {...data} key={cache} />
                </>
            )
        }else{
            return (
                <>
                    <PresetListHeader {...props} />
                    <PresetListUi {...props} />
                </>
            )
        }
    }

    return ui()
}

export default Comp;