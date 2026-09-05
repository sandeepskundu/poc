import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import AppsList from 'aio-app-ui-tdc-templates/apps-list';

const DESKTOPSRP = (props) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appPage={<AppsList {...props} />}
        />
    )
}

export default DESKTOPSRP;