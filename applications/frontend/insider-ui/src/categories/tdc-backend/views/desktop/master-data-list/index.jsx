import PageLayout from 'aio-app-ui-templates/page-layout';
import MasterDataList from 'aio-app-ui-tdc-backend-templates/master-data-list';

const DESKTOPSRP = (dprops) => {
    return (
        <PageLayout
            appMenu={''}
            appRightMenu={''}
            appPage={<MasterDataList />}
        />
    )
}

export default DESKTOPSRP;