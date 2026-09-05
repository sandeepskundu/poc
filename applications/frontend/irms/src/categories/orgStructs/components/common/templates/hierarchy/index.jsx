import helpers from 'ui-helpers';
import appHelpers from 'app-helpers';
import {useEffect, useState, useRef} from 'react';
import mhelper from 'aio-app-ui-orgStructs-modules';
import HierarchyHeader from 'aio-app-ui-orgStructs-organisms/hierarchy-header';
import HierarchyListUi from 'aio-app-ui-orgStructs-organisms/hierarchy-list-ui';

const Comp = (dprops) => {
    const id = helpers.random.id(10);

    const dvals = {
        blank:true,
        configs:{
            enums:mhelper.constants.enums
        }
    }

    const [data, setData] = useState(dvals)
    const fristRender = helpers.react.state.frist(useRef(true), useEffect)();

    const onResp = (resp, arg) => {

        let d = helpers.json.copy(data);
        let id = helpers.json.val(_siteProps_, 'router.params.id', '');

        if(id){
            d.results = helpers.json.val(resp, 'childHierarchyByParentHashId', []);
        }else{
            d.results = helpers.json.val(resp, 'rootHierarchy', [])
        }

        d = helpers.json.merge(d, resp);
        d.blank = false;
        setData(d);
    }

    if(fristRender){
        let id = helpers.json.val(_siteProps_, 'router.params.id', '');

        if(id){
            appHelpers.store.get([{
                name:'orgStructure.hierarchy.childHierarchyByParentHashId'
            }, {
                name:'orgStructure.hierarchy.hierarchyDataByHash'
            }], onResp);
        }else{
            appHelpers.store.get([{
                name:'orgStructure.hierarchy.rootHierarchy'
            }], onResp);
        }
    }

    return (
        <>
            <HierarchyHeader {...data} />
            <HierarchyListUi {...data} />
        </>
    )
}

export default Comp 