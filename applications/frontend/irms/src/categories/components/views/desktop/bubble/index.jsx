import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import Bubble from 'aio-app-ui-components-templates/bubble';

const DESKTOPSRP = (dprops) => {
    return (
        <LayoutBuilder
            appMenu={''}
            _appRightMenu={null}
            appPage={() => {
                return <Bubble />
            }}
        />
    )
}

export default DESKTOPSRP;