import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import Divider from 'aio-app-ui-components-templates/divider';

const DESKTOPSRP = (dprops) => {
    return (
        <LayoutBuilder
            appMenu={''}
            _appRightMenu={null}
            appPage={() => {
                return <Divider />
            }}
        />
    )
}

export default DESKTOPSRP;