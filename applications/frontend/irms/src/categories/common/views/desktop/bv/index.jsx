import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import BusinessVerticals from 'aio-app-ui-common-templates/business-verticals';

const DESKTOPSRP = (dprops) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appPage={<BusinessVerticals />}
        />
    )
}

export default DESKTOPSRP;