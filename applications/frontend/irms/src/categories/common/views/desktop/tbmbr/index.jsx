import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import Tbmbr from 'aio-app-ui-common-templates/tbmbr';

const DESKTOPSRP = (props) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appPage={<Tbmbr {...props} />}
        />
    )
}

export default DESKTOPSRP;