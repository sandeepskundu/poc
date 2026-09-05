import helpers from 'ui-helpers';
import appHelpers from 'app-helpers';
import {useEffect, useState, useRef} from 'react';
import UiComponentListUi from 'aio-app-ui-tdc-interface-kit-organisms/ui-components-list-ui';
import UiComponentsListHeader from 'aio-app-ui-tdc-interface-kit-organisms/ui-components-list-header';

const Comp = (dprops) => {
    const id = helpers.random.id(10);

    const dvals = {
        blank:true,
        configs:{
            atomic:{
                options:{
                    0:{
                        id:'atoms',
                        label:'Atoms'
                    },
                    1:{
                        id:'molecules',
                        label:'Molecules'
                    },
                    2:{
                        id:'organisms',
                        label:'Organisms'
                    },
                    3:{
                        id:'templates',
                        label:'Templates'
                    },
                    4:{
                        id:'pages',
                        label:'Pages'
                    },
                    5:{
                        id:'widgets',
                        label:'Widgets'
                    }
                }
            },
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
                d.results = helpers.json.val(resp, 'parentComponentData', []);
            }else{
                d.results = helpers.json.val(resp, 'rootComponentsData', [])
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
                name:'componentDataByParentHashId'
            }, {
                name:'componentDataByHashId'
            }], onResp);
        }else{
            appHelpers.store.get([{
                name:'rootComponentsData'
            }], onResp);
        }
    }

    return (
        <>
            <UiComponentsListHeader {...data} />
            <UiComponentListUi {...data} />
        </>
    )
}

export default Comp 