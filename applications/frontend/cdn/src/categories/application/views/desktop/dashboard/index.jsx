import React from 'react';
import Dashboard from 'aio-app-ui-application-templates/dashbord';
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
                                    <Dashboard />
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