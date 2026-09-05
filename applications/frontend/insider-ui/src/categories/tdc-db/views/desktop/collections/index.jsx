import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import CollectionList from 'aio-app-ui-tdc-db-templates/collections-list';

const DESKTOPSRP = (dprops) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appRightMenu={''}
            appPage={<CollectionList />}
        />
    )
}

export default DESKTOPSRP;