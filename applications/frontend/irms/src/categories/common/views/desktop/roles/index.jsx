import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import Roles from 'aio-app-ui-common-templates/roles';

const DESKTOPSRP = (props) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appPage={<Roles {...props} />}
        />
    )
}

export default DESKTOPSRP;