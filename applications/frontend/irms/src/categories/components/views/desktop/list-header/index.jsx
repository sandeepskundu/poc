import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import ListHeader from 'aio-app-ui-components-templates/list-header';

const DESKTOPSRP = (dprops) => {
    return (
        <LayoutBuilder
            appMenu={''}
            _appRightMenu={null}
            appPage={() => {
                return <ListHeader />
            }}
        />
    )
}

export default DESKTOPSRP;