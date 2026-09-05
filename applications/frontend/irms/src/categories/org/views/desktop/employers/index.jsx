import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import Employers from 'aio-app-ui-org-templates/employers';

const DESKTOPSRP = (dprops) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appPage={<Employers />}
        />
    )
}

export default DESKTOPSRP;