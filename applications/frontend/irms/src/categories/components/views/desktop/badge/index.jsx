import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import Badge from 'aio-app-ui-components-templates/badge';

const DESKTOPSRP = (dprops) => {
    return (
        <LayoutBuilder
            appMenu={''}
            _appRightMenu={null}
            appPage={() => {
                return <Badge />
            }}
        />
    )
}

export default DESKTOPSRP;