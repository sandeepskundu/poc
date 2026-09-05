import React from 'react';
import AppPageWithMenu from 'aio-global-ui/organisms/app-page-with-menu';
import UiPipelinesItemList from 'aio-app-ui-devops-templates/ui-pipelines-items-list';

const DESKTOPSRP = (propsny) => {

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
                                    <UiPipelinesItemList />
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