import helpers from 'ui-helpers';
import {useEffect, useState, useRef} from 'react';
import MapListUi from 'aio-app-ui-access-organisms/map-list-ui';
import MapListHeader from 'aio-app-ui-access-organisms/map-list-header';

const Comp = (dprops) => {
    const dvals = {
        blank:true,
        configs:{ }
    }

    const [data, setData] = useState(dvals);
    const [cache, setCache] = useState(helpers.random.id(16))
    const id = helpers.json.val(_siteProps_, 'router.params.id', '');
    const mId = helpers.json.val(_siteProps_, 'router.params.mId', '');
    const fristRender = helpers.react.state.frist(useRef(true), useEffect)();

    const onResp = (resp) => {
        let d = helpers.json.copy(data);
            d.results = helpers.json.val(resp, 'results', []);
            d.details = helpers.json.val(resp, 'details', {});
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

    if(fristRender){
        let li = [
            request('access.map.getByMapId', mId, 'results', 'data.result', []),
        ];

        if(id){
            li.push(request('access.map.getById', id, 'details', 'data.result.0', {}))
        }

        helpers.store.getDetailsById(li, onResp);
    }

    return (
        <>
            <MapListHeader {...data} />
            <MapListUi {...data} key={cache} />
        </>
    )
}

export default Comp 