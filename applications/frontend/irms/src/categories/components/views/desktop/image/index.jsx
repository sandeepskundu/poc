import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import Image from 'aio-app-ui-components-templates/image';

const DESKTOPSRP = (dprops) => {
    return (
        <LayoutBuilder
            appMenu={''}
            _appRightMenu={null}
            appPage={() => {
                return <Image />
            }}
        />
    )
}

export default DESKTOPSRP;