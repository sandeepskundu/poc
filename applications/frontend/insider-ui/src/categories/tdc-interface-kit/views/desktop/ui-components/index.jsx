import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import UiComponents from 'aio-app-ui-tdc-interface-kit-templates/ui-components';

const DESKTOPSRP = (dprops) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appRightMenu={''}
            appPage={<UiComponents />}
        />
    )
}

export default DESKTOPSRP;