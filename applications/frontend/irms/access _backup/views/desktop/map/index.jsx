import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import AccessMapsList from 'aio-app-ui-access-templates/maps-list';

const DESKTOPSRP = (dprops) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appPage={<AccessMapsList />}
        />
    )
}

export default DESKTOPSRP;