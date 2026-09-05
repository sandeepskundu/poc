import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import DsThemeColors from 'aio-app-ui-tdc-ds-templates/ds-theme-colors';

const PageView = (dprops) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appRightMenu={''}
            appPage={<DsThemeColors />}
        />
    )
}

export default PageView;