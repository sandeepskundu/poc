import helpers from 'ui-helpers';
import {useEffect, useState, useRef} from 'react';
import TbmbrHeader from 'aio-app-ui-common-organisms/tbmbr-header';
import TbmbrListUi from 'aio-app-ui-common-organisms/tbmbr-list-ui';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    const dvals = {
        blank:true,
        details:{},
        configs:{}
    }

    const dv = dvals;
    const [data, setData] = useState(dvals);
    const id = helpers.json.val(_siteProps_, 'router.params.id', '');
    const mId = helpers.json.val(_siteProps_, 'router.params.mId', '');
    const type = helpers.json.val(_siteProps_, 'router.params.type', '');
    const itemId = helpers.json.val(_siteProps_, 'router.params.itemId', '');
    const fristRender = helpers.react.state.frist(useRef(true), useEffect)();

    const onResp = (resp, arg) => {
        let d = helpers.json.copy(dv);
            d = helpers.json.merge(d, arg || {});
            d = helpers.json.merge(d, resp);
            d.blank = false;
            setData(d);
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

    const onApiResp = (resp) => {
        onResp(resp);
    };

    const onConstResp = (res) => {
        dv.configs = res || {};
        let rl = [
            request('common.tbis.detailsById', {id:mId}, 'team', 'data.result.0', {}),
            request('common.tbmbr.listByTeamId', {id:mId}, 'results', 'data.result', [])
        ]

        if(id){
            rl.push(request('common.tbmbr.detailsById', {id:id}, 'details', 'data.result.0', {}));
        }

        helpers.store.getDetailsById(rl, onApiResp);
    }

    if(fristRender){
        helpers.store.getConstants({
            request:{
                data:{
                    includes:{
                        "access.link.for":true
                    }
                }
            }
        }, onConstResp);
    }

    return (
        <>
            <TbmbrHeader {...props} {...data} />
            <TbmbrListUi {...props} {...data} />
        </>
    )
}

export default Comp 