import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import AccessRoles from 'aio-app-ui-common-templates/access-roles';

const DESKTOPSRP = (props) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appPage={<AccessRoles {...props} />}
        />
    )
}

export default DESKTOPSRP;