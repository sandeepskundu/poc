import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import ApiPresetList from 'aio-app-ui-access-templates/api-presets-list';

const DESKTOPSRP = (dprops) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appPage={<ApiPresetList />}
        />
    )
}

export default DESKTOPSRP;