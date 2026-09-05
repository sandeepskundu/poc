import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import Dashboard from 'aio-app-ui-tdc-templates/dashboard';

const DESKTOPSRP = (props) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appPage={<Dashboard {...props} />}
        />
    )
}

export default DESKTOPSRP;