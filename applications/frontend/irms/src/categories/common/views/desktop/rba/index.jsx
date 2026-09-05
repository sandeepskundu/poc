import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import Rba from 'aio-app-ui-common-templates/rba';

const DESKTOPSRP = (props) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appPage={<Rba {...props} />}
        />
    )
}

export default DESKTOPSRP;