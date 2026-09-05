import React from 'react';
import ApplicationDetails from 'aio-app-ui-application-templates/application-details-form';
import AppPageWithMenu from 'aio-global-ui/organisms/app-page-with-menu';

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
                                    <ApplicationDetails />
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