import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import Dot from 'aio-app-ui-components-templates/dot';

const DESKTOPSRP = (dprops) => {
    return (
        <LayoutBuilder
            appMenu={''}
            _appRightMenu={null}
            appPage={() => {
                return <Dot />
            }}
        />
    )
}

export default DESKTOPSRP;