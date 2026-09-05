import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import Departments from 'aio-app-ui-common-templates/departments';

const DESKTOPSRP = (props) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appPage={<Departments {...props} />}
        />
    )
}

export default DESKTOPSRP;