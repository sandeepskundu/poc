import helpers from 'ui-helpers';
import {useEffect, useState, useRef} from 'react';
import TeamListUi from 'aio-app-ui-common-organisms/team-list-ui';
import TeamListHeader from 'aio-app-ui-common-organisms/team-list-header';

const Comp = (props) => {
    
    const dvals = {
        blank:true,
        details:{},
        configs:{}
    }

    let dv = dvals;
    const [data, setData] = useState(dvals);
    const id = helpers.json.val(_siteProps_, 'router.params.id', '');
    const mId = helpers.json.val(_siteProps_, 'router.params.mId');
    const type = helpers.json.val(_siteProps_, 'router.params.type');
    const fristRender = helpers.react.state.frist(useRef(true), useEffect)();

    const onResp = (resp, arg) => {
        let d = helpers.json.copy(dv);
            d = helpers.json.merge(d, arg || {});
            d.results = helpers.json.val(resp, 'results', []);
            d = helpers.json.merge(d, resp);
            d.blank = false;
            setData(d);
    }

    const request = (name, params) => {
        return {
            name:name,
            request:{
                options:{
                    //endpoint:'access.roles.roleDataByHash',
                },
                request:{
                    method:'get',
                    params:params || {}
                },
                dataMaker:(data, rawResp, configs, error) => {
                    return helpers.json.val(data, 'data.result', []);
                },
                responseDataMap:{
                    "fallback":{},
                    "from":"data",
                    "to":"results",
                },
            }
        };
    }

    const detailsResp = (resp) => {
        dv.details = helpers.json.val(resp, 'details', {});
        dv.blank = false;
        onResp(dv);
    }

    const details = () => {
        let req = request('common.team.detailsById', {id:id});
            req = helpers.json.merge(req, {
                request:{
                    dataMaker:(data, rawResp, configs, error) => {
                        return helpers.json.val(data, 'data.result.0', {});
                    },
                    responseDataMap:{
                        "to":"details",
                    },
                }
            });
            helpers.store.getDetailsById([req], detailsResp);
    }

    const onResultResp = (resp) => {
        if(id){
            dv.results = helpers.json.val(resp, 'results', []);
            details();
        }else{
            onResp(resp, dv);
        }
    }

    if(fristRender){
        helpers.store.getDetailsById([request('common.team.listByTypeAndMapId', {mapId:mId, type:type})], onResultResp); 
    }

    return (
        <>
            <TeamListHeader {...data} />
            <TeamListUi {...data} />
        </>
    )
}

export default Comp 