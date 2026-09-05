import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import BusinessUnit from 'aio-app-ui-common-templates/business-unit';

const DESKTOPSRP = (dprops) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appPage={<BusinessUnit />}
        />
    )
}

export default DESKTOPSRP;