import PageLayout from 'aio-app-ui-templates/page-layout';
import Dashboard from 'aio-app-ui-tdc-cms-templates/cms-data-dashboard';

const DESKTOPSRP = (dprops) => {
    return (
        <PageLayout
            appMenu={''}
            appRightMenu={''}
            appPage={<Dashboard />}
        />
    )
}

export default DESKTOPSRP;