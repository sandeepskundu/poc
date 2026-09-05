import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import Buttons from 'aio-app-ui-components-templates/buttons';

const DESKTOPSRP = (dprops) => {
    return (
        <LayoutBuilder
            appMenu={''}
            _appRightMenu={null}
            appPage={() => {
                return <Buttons />
            }}
        />
    )
}

export default DESKTOPSRP;