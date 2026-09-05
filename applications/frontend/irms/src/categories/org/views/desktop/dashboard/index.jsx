import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import Dashboard from 'aio-app-ui-org-templates/dashboard';

const DESKTOPSRP = (dprops) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appPage={<Dashboard />}
        />
    )
}

export default DESKTOPSRP;