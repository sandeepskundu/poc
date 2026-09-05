import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import ListItem from 'aio-app-ui-components-templates/list-item';

const DESKTOPSRP = (dprops) => {
    return (
        <LayoutBuilder
            appMenu={''}
            _appRightMenu={null}
            appPage={() => {
                return <ListItem />
            }}
        />
    )
}

export default DESKTOPSRP;