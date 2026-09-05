import helpers from 'ui-helpers';
import {useEffect, useState, useRef} from 'react';
import RolesHeader from 'aio-app-ui-common-organisms/roles-header';
import RolesListUi from 'aio-app-ui-common-organisms/roles-list-ui';

const Comp = (props) => {
    const dvals = {
        blank:true,
        details:{},
        configs:{}
    }

    let dv = dvals;
    const [data, setData] = useState(dvals)
    const id = helpers.json.val(_siteProps_, 'router.params.id', '');
    const dpId = helpers.json.val(_siteProps_, 'router.params.dpId', '')
    const fristRender = helpers.react.state.frist(useRef(true), useEffect)();

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

    const onRoleListResp = (resp) => {
        let d = helpers.json.copy(dv);
            d.blank = false;
            d.details = helpers.json.val(resp, 'details', {});
            d.results = helpers.json.val(resp, 'results', []);
            d.department = helpers.json.val(resp, 'department', {});
            setData(d);
    }

    const onConstResp = (res) => {
            dv.configs = res || {};
        let li = [
            request('common.roles.byDepatmentId', dpId, 'results', 'data.result', []),
            request('common.departments.detailsById', dpId, 'department', 'data.result.0', {})
        ];

        if(id){
            li.push(request('common.roles.detailsById', id, 'details', 'data.result.0', {}))
        }

        helpers.store.getDetailsById(li, onRoleListResp);
    }

    if(fristRender){
        helpers.store.getConstants({
            request:{
                data:{
                    includes:{
                        "employment.band.default":true,
                        "employment.grades.default":true
                    }
                }
            },
            dataMakers:{}
        }, onConstResp);  
    }

    return (
        <>
            <RolesHeader {...props} {...data} />
            <RolesListUi {...props} {...data} />
        </>
    )
}

export default Comp 