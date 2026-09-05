import helpers from 'ui-helpers';
import {useEffect, useState, useRef} from 'react';
import EmployersHeader from 'aio-app-ui-org-organisms/employers-header';
import EmployersListUi from 'aio-app-ui-org-organisms/employers-list-ui';

const Comp = (dprops) => {
    
    const dvals = {
        blank:true,
        details:{},
        configs:{}
    }

    let dv = dvals;
    const [data, setData] = useState(dvals)
    const fristRender = helpers.react.state.frist(useRef(true), useEffect)();

    const onResp = (resp, arg) => {
        let d = helpers.json.copy(dv);
            d = helpers.json.merge(d, arg || {});
            d.results = helpers.json.val(resp, 'results', []);
            d = helpers.json.merge(d, resp);
            d.blank = false;
            setData(d);
    }

    const request = (name) => {
        return {
            name:name,
            request:{
                options:{
                    //endpoint:'access.roles.roleDataByHash',
                },
                request:{
                    method:'get',
                    params:{}
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
        let req = request('org.employers.detailsById');
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
        let id = helpers.json.val(_siteProps_, 'router.params.id', '');

        if(id){
            dv.results = helpers.json.val(resp, 'results', []);
            details();
        }else{
            onResp(resp, dv);
        }
    }

    if(fristRender){
        helpers.store.getDetailsById([request('org.employers.rootList')], onResultResp, true); 
    }

    return (
        <>
            <EmployersHeader {...data} />
            <EmployersListUi {...data} />
        </>
    )
}

export default Comp 