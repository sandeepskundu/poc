import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import Onboarding from 'aio-app-ui-empManagement-templates/onboarding';

const DESKTOPSRP = (props) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appPage={<Onboarding {...props} />}
        />
    )
}

export default DESKTOPSRP;