import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import EmpProfile from 'aio-app-ui-empManagement-templates/emp-profile';

const DESKTOPSRP = (props) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appPage={<EmpProfile {...props} />}
        />
    )
}

export default DESKTOPSRP;