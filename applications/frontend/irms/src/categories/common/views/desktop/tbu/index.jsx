import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import Tbu from 'aio-app-ui-common-templates/tbu';

const DESKTOPSRP = (props) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appPage={<Tbu {...props} />}
        />
    )
}

export default DESKTOPSRP;