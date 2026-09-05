import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import Applications from 'aio-app-ui-tdc-templates/apps';

const DESKTOPSRP = (props) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appPage={<Applications {...props} />}
        />
    )
}

export default DESKTOPSRP;