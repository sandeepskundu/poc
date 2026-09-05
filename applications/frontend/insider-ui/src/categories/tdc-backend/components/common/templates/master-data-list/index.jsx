import helpers from 'ui-helpers';
import appHelpers from 'app-helpers';
import React, {useEffect, useState, useRef} from 'react';
import MasterDataListUi from 'aio-app-ui-tdc-backend-organisms/master-data-list-ui';
import MasterDataListHeader from 'aio-app-ui-tdc-backend-organisms/master-data-list-header';

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
                d.results = helpers.json.val(resp, 'parentMasterData', []);
            }else{
                d.results = helpers.json.val(resp, 'rootMasterData', [])
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
                name:'masterDataByParentHashId'
            }, {
                name:'masterDataHashId'
            }], onResp);
        }else{
            appHelpers.store.get([{
                name:'rootMasterData'
            }], onResp);
        }
    }

    return (
        <>
            <MasterDataListHeader {...data} />
            <MasterDataListUi {...data} />
        </>
    )
}

export default Comp 