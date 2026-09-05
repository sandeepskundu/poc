import React from 'react';
import appHelpers from 'app-helpers';
import AppPageWithMenu from 'aio-global-ui/organisms/app-page-with-menu';
import PrepairToBuild from 'aio-app-ui-application-templates/prepair-to-build';

const DESKTOPSRP = (propsny) => {

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
            _dataMaker:(resp, config) => {},
            responseDataMap:{
                "fallback":{},
                "from":"data",
                "to":"mandeep.kundu.hissar",
            },
        }
    }], onResp);

    const com = () => {
        return (
            <>
                <AppPageWithMenu 
                    appMenu={() => {
                        return (
                            <>
                                {/*--t()--*/}
                            </>
                        )
                    }}

                    appRightMenu={() => {
                        return (
                            <></>
                        )
                    }}

                    appPage={() => {
                        return (
                            <>
                                <div className='full bxs'>
                                    <PrepairToBuild />
                                </div>
                            </>
                        )
                    }}
                />
            </>
        )
    }

    return (
        <>
            <div className='full pd-tb20'>
                {com()}
            </div>
        </>
    )
}

export default DESKTOPSRP;