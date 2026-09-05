import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import Avatar from 'aio-app-ui-components-templates/avatar';

const DESKTOPSRP = (dprops) => {
    return (
        <LayoutBuilder
            appMenu={''}
            _appRightMenu={null}
            appPage={() => {
                return <Avatar />
            }}
        />
    )
}

export default DESKTOPSRP;