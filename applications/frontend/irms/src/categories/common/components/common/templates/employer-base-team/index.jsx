import helpers from 'ui-helpers';
import {useEffect, useState, useRef} from 'react';
import EatHeader from 'aio-app-ui-common-organisms/eat-header';
import EatListUi from 'aio-app-ui-common-organisms/eat-list-ui';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    const dvals = {
        blank:true,
        details:{},
        configs:{}
    }

    let dv = dvals;
    const [data, setData] = useState(dvals);
    const id = helpers.json.val(_siteProps_, 'router.params.id', '');
    const mId = helpers.json.val(_siteProps_, 'router.params.mId', '');
    const fristRender = helpers.react.state.frist(useRef(true), useEffect)();

    const onResp = (resp, arg) => {
        let d = helpers.json.copy(dv);
            d = helpers.json.merge(d, arg || {});
            d.results = helpers.json.val(resp, 'results', []);
            d = helpers.json.merge(d, resp);
            d.blank = false;
            setData(d);
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

    const detailsResp = (resp) => {
        dv.details = helpers.json.val(resp, 'details', {});
        dv.blank = false;
        onResp(dv);
    }

    const onResultResp = (resp) => {
        if(id){
            dv.results = helpers.json.val(resp, 'results', []);
            helpers.store.getDetailsById([request('common.eat.detailsById', id, 'details', 'data.result.0', {})], detailsResp);
        }else{
            onResp(resp, dv);
        }
    }

    if(fristRender){
        helpers.store.getDetailsById([request('common.eat.listByParentId', mId, 'results', 'data.result', [])], onResultResp); 
    }

    return (
        <>
            <EatHeader {...props} {...data} />
            <EatListUi {...props} {...data} />
        </>
    )
}

export default Comp 