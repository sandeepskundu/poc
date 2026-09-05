import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import AccessRolesList from 'aio-app-ui-access-templates/access-roles-list';

const DESKTOPSRP = (dprops) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appPage={<AccessRolesList />}
        />
    )
}

export default DESKTOPSRP;