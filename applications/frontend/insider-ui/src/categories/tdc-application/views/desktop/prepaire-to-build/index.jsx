import appHelpers from 'app-helpers';
import PrepairToBuild from 'aio-app-ui-tdc-application-templates/prepair-to-build';
import LayoutBuilder from 'aio-app-ui-templates/page-layout';

const PageView = (propsny) => {

    const onResp = (resp, arg) => {
        console.log(resp);
    }

    appHelpers.store.get([{
        name:'internalDataRootList'
    }, {
        name:'internalDataChildsList',
        "request":{
            request:{
                params:{
                    id:'ac8b0ea14859d563d1d6403a21c00ccc'
                }
            }
        }
    }, {
        name:'internalDataChildsList',
        "request":{
            request:{
                query:{
                    id:'s'
                },
                params:{
                    id:'ac8b0ea14859d563d1d6403a21c00ccc'
                }
            },
            _dataMaker:(resp, config) => {
            },
            responseDataMap:{
                "fallback":{},
                "from":"data",
                "to":"mandeep.kundu.hissar",
            },
        }
    }], onResp);

    return (
        <LayoutBuilder
            appMenu={''}
            appRightMenu={''}
            appPage={<PrepairToBuild />}
        />
    )
}

export default PageView;