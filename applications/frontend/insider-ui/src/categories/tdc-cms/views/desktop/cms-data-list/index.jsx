import PageLayout from 'aio-app-ui-templates/page-layout';
import CmsDataList from 'aio-app-ui-tdc-cms-templates/cms-data-list';

const DESKTOPSRP = (dprops) => {
    return (
        <PageLayout
            appMenu={''}
            appRightMenu={''}
            appPage={<CmsDataList />}
        />
    )
}

export default DESKTOPSRP;