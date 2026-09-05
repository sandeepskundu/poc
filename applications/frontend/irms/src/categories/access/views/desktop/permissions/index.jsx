import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import PermissionsList from 'aio-app-ui-access-templates/permissions-list';

const DESKTOPSRP = (props) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appPage={<PermissionsList {...props} />}
        />
    )
}

export default DESKTOPSRP;