import Dashboard from 'aio-app-ui-tdc-ds-templates/dashbord';
import LayoutBuilder from 'aio-app-ui-templates/page-layout';

const PageView = (dprops) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appRightMenu={''}
            appPage={<Dashboard/>}
        />
    )
}

export default PageView;