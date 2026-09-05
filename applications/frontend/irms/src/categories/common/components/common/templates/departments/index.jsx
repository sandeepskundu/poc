import helpers from 'ui-helpers';
import {useEffect, useState, useRef} from 'react';
import DepartmentsHeader from 'aio-app-ui-common-organisms/departments-header';
import DepartmentsListUi from 'aio-app-ui-common-organisms/departments-list-ui';

const Comp = (dprops) => {
    
    const dvals = {
        blank:true,
        details:{},
        pDetails:{},
        configs:{}
    }

    let dv = dvals;
    const [data, setData] = useState(dvals);
    const id = helpers.json.val(_siteProps_, 'router.params.id', '');
    const mId = helpers.json.val(_siteProps_, 'router.params.mId', '');
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

    const onResp = (arg) => {
        let d = helpers.json.copy(dv);
            d.details = helpers.json.val(arg, 'details', {});
            d.results = helpers.json.val(arg, 'results', []);
            d.blank = false;
            setData(d);
    }

    if(fristRender){
        let li = [];

        if(id){
            li.push(request('common.departments.getChildsByParentId', id, 'results', 'data.result', []));
            li.push(request('common.departments.detailsById', id, 'details', 'data.result.0', {}));  
        }else{
            li.push(request('common.departments.getChildsByParentId', mId, 'results', 'data.result', []));
        }

        helpers.store.getDetailsById(li, onResp);
    }

    return (
        <>
            <DepartmentsHeader {...data} />
            <DepartmentsListUi {...data} />
        </>
    )
}

export default Comp 