import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import ApplicationDetails from 'aio-app-ui-tdc-application-templates/application-details-form';

const PageView = (dprops) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appRightMenu={''}
            appPage={<ApplicationDetails />}
        />
    )
}

export default PageView;