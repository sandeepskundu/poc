import List from 'aio-app-ui-home-templates/list';
import LayoutBuilder from 'aio-app-ui-templates/page-layout';

const DESKTOPSRP = (dprops) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appRightMenu={''}
            appPage={<List />}
        />
    )
}

export default DESKTOPSRP;