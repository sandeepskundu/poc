import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import ContentRow from 'aio-app-ui-components-templates/content-row';

const DESKTOPSRP = (dprops) => {
    return (
        <LayoutBuilder
            appMenu={''}
            _appRightMenu={null}
            appPage={() => {
                return <ContentRow />
            }}
        />
    )
}

export default DESKTOPSRP;