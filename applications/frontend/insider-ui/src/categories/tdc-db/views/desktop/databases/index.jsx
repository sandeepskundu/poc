import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import DatabasesList from 'aio-app-ui-tdc-db-templates/databases-list';

const DESKTOPSRP = (dprops) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appRightMenu={''}
            appPage={<DatabasesList />}
        />
    )
}

export default DESKTOPSRP;