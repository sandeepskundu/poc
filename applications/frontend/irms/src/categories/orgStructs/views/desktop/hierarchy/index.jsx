import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import Hierarchy from 'aio-app-ui-orgStructs-templates/hierarchy';

const DESKTOPSRP = (dprops) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appPage={<Hierarchy />}
        />
    )
}

export default DESKTOPSRP;