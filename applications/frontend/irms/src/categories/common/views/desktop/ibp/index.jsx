import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import Ibp from 'aio-app-ui-common-templates/ibp';

const DESKTOPSRP = (props) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appPage={<Ibp {...props} />}
        />
    )
}

export default DESKTOPSRP;