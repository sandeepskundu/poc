import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import Inputs from 'aio-app-ui-components-templates/inputs';

const DESKTOPSRP = (dprops) => {
    return (
        <LayoutBuilder
            appMenu={''}
            _appRightMenu={null}
            appPage={() => {
                return <Inputs />
            }}
        />
    )
}

export default DESKTOPSRP;