import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import ApiLinkedPresetDetails from 'aio-app-ui-access-templates/api-linked-presets-details';

const DESKTOPSRP = (dprops) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appPage={<ApiLinkedPresetDetails />}
        />
    )
}

export default DESKTOPSRP;