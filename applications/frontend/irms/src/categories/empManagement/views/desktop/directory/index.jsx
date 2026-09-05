import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import Directory from 'aio-app-ui-empManagement-templates/directory';

const DESKTOPSRP = (dprops) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appPage={<Directory />}
        />
    )
}

export default DESKTOPSRP;