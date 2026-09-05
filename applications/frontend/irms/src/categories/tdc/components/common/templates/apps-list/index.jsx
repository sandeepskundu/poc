import helpers from 'ui-helpers';
import {useEffect, useState, useRef} from 'react';
import AppListUi from 'aio-app-ui-tdc-organisms/app-list-ui';
import AppListheader from 'aio-app-ui-tdc-organisms/app-list-header';

const Comp = (props) => {
    const dvals = {
        blank:true,
        configs:{ }
    }

    const dv = dvals;
    const [data, setData] = useState(dvals);
    const [cache, setCache] = useState(helpers.random.id(16))
    const type = helpers.json.val(_siteProps_, 'router.params.type', '');
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
                        cate:id
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
        helpers.store.getDetailsById([request('tdc.app.listByCate', type, 'results', 'data.result', [])], onResp);
    }

    return (
        <>
            <AppListheader {...props} {...data} />
            <AppListUi {...props} {...data} key={cache} />
        </>
    )
}

export default Comp 