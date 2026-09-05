import helpers from 'ui-helpers';
import appHelpers from 'app-helpers';
import {useEffect, useState, useRef} from 'react';
import CmsDataListUi from 'aio-app-ui-tdc-cms-organisms/cms-data-list-ui';
import CmsDataListHeader from 'aio-app-ui-tdc-cms-organisms/cms-data-list-header';

const Comp = (dprops) => {
    const id = helpers.random.id(10);

    const dvals = {
        blank:true,
        configs:{
            exposed:{
                options:{
                    0:{
                        id:'internally',
                        label:'Internally'
                    },
                    1:{
                        id:'public',
                        label:'Publically'
                    }
                }
            }
        }
    }

    const [data, setData] = useState(dvals)
    const fristRender = helpers.react.state.frist(useRef(true), useEffect)();

    const onResp = (resp, arg) => {

        let d = helpers.json.copy(data);
        let id = helpers.json.val(_siteProps_, 'router.params.id', '');

            if(id){
                d.results = helpers.json.val(resp, 'parentCmsData', []);
            }else{
                d.results = helpers.json.val(resp, 'rootCmsData', [])
            }

            d = helpers.json.merge(d, resp);
            d.blank = false;
            console.log(d);
            setData(d);
    }

    if(fristRender){
        let id = helpers.json.val(_siteProps_, 'router.params.id', '');

        if(id){
            appHelpers.store.get([{
                name:'cmsDataByParentHashId'
            }, {
                name:'cmsDataHashId'
            }], onResp);
        }else{
            appHelpers.store.get([{
                name:'rootCmsData'
            }], onResp);
        }
    }

    return (
        <>
            <CmsDataListHeader {...data} />
            <CmsDataListUi {...data} />
        </>
    )
}

export default Comp 