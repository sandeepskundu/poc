import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import AppPageWithMenu from 'aio-global-ui/organisms/app-page-with-menu';

const PageLayout = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const getComp = (type) => {
        const page = helpers.json.val(props, type);
        const isfun = helpers.data.type.is(page, 'function')

        if(isfun){
            return page()
        }else{
            return page || '';
        }
    }

    const com = () => {
        return (
            <>
                <AppPageWithMenu 
                    appMenu={() => {
                        return getComp('appMenu')
                    }}

                    _appRightMenu={() => {
                        return getComp('appRightMenu');
                    }}

                    appPage={() => {
                        return (
                            <>
                                <div className='full bxs'>
                                    {getComp('appPage')}
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

export default PageLayout;