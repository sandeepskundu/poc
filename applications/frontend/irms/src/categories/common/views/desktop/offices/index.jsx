import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import Offices from 'aio-app-ui-common-templates/offices';

const DESKTOPSRP = (dprops) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appPage={<Offices />}
        />
    )
}

export default DESKTOPSRP;