import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import RolesMapsList from 'aio-app-ui-access-templates/roles-list';

const DESKTOPSRP = (dprops) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appPage={<RolesMapsList />}
        />
    )
}

export default DESKTOPSRP;