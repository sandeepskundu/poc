import PageLayout from 'aio-app-ui-templates/page-layout';
import HomePage from 'aio-app-ui-tdc-templates/home-page';

const DESKTOPSRP = (dprops) => {
    return (
        <PageLayout
            appMenu={''}
            appRightMenu={''}
            appPage={<HomePage />}
        />
    )
}

export default DESKTOPSRP;