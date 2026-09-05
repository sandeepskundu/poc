import PageLayout from 'aio-app-ui-templates/page-layout';
import UiTemplateList from 'aio-app-ui-tdc-cms-templates/ui-template-list';

const DESKTOPSRP = (dprops) => {
    return (
        <PageLayout
            appMenu={''}
            appRightMenu={''}
            appPage={<UiTemplateList />}
        />
    )
}

export default DESKTOPSRP;