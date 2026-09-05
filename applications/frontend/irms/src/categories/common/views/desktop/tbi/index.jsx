import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import Tbi from 'aio-app-ui-common-templates/tbi';

const DESKTOPSRP = (props) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appPage={<Tbi {...props} />}
        />
    )
}

export default DESKTOPSRP;