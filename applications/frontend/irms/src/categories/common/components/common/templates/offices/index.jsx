import helpers from 'ui-helpers';
import {useEffect, useState, useRef} from 'react';
import OfficesHeader from 'aio-app-ui-common-organisms/offices-header';
import OfficesListUi from 'aio-app-ui-common-organisms/offices-list-ui';

const Comp = (dprops) => {
    
    const dvals = {
        blank:true,
        details:{},
        configs:{}
    }

    let dv = dvals;
    const [data, setData] = useState(dvals)
    const id = helpers.json.val(_siteProps_, 'router.params.id', '');
    const eId = helpers.json.val(_siteProps_, 'router.params.eId', '')
    const fristRender = helpers.react.state.frist(useRef(true), useEffect)();

    const onResp = (resp, arg) => {
        let d = helpers.json.copy(dv);
            d = helpers.json.merge(d, arg || {});
            d.results = helpers.json.val(resp, 'results', []);
            d = helpers.json.merge(d, resp);
            d.blank = false;
            setData(d);
    }

    const request = (name, id) => {
        return {
            name:name,
            request:{
                options:{
                    //endpoint:'access.roles.roleDataByHash',
                },
                request:{
                    method:'get',
                    params:{
                        id:id
                    }
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
        let req = request('common.offices.detailsById', id);
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

    const onConstResp = (res) => {
        dv.configs = res || {};
        helpers.store.getDetailsById([request('common.offices.byEmployerId', eId)], onResultResp); 
    }
    
    if(fristRender){
        helpers.store.getConstants({
            request:{
                data:{
                    includes:{
                        "country.list":true,
                        "india.states.all":true
                    }
                }
            },
            dataMakers:{
                "name.titles.adults":null
            }
        }, onConstResp);
    }

    return (
        <>
            <OfficesHeader {...data} />
            <OfficesListUi {...data} />
        </>
    )
}

export default Comp 