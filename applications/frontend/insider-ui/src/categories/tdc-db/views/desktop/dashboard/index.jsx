import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import Dashboard from 'aio-app-ui-tdc-db-templates/dashboard';

const DESKTOPSRP = (dprops) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appRightMenu={''}
            appPage={<Dashboard />}
        />
    )
}

export default DESKTOPSRP;