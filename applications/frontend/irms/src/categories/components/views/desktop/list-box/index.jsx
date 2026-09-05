import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import ListBox from 'aio-app-ui-components-templates/list-box';

const DESKTOPSRP = (dprops) => {
    return (
        <LayoutBuilder
            appMenu={''}
            _appRightMenu={null}
            appPage={() => {
                return <ListBox />
            }}
        />
    )
}

export default DESKTOPSRP;