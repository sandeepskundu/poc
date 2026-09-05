import helpers from 'ui-helpers';
import appHelpers from 'app-helpers';
import {useEffect, useState, useRef} from 'react';
import UiTemplateListUi from 'aio-app-ui-tdc-cms-organisms/ui-template-list-ui';
import UiTemplateListHeader from 'aio-app-ui-tdc-cms-organisms/ui-template-list-header';

const Comp = (dprops) => {
    const id = helpers.random.id(10);

    const dvals = {
        blank:true,
        configs:{
            props:{
                types:{
                    0:{
                        id:'html',
                        label:'HTML'
                    },
                    1:{
                        id:'jsx',
                        label:'JSX Component'
                    }
                }
            },
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
                d.results = helpers.json.val(resp, 'parentTemplateData', []);
            }else{
                d.results = helpers.json.val(resp, 'rootTemplateData', [])
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
                name:'templateDataByParentHashId'
            }, {
                name:'templateDataByHashId'
            }], onResp);
        }else{
            appHelpers.store.get([{
                name:'rootTemplateData'
            }], onResp);
        }
    }

    return (
        <>
            <UiTemplateListHeader {...data} />
            <UiTemplateListUi {...data} />
        </>
    )
}

export default Comp 