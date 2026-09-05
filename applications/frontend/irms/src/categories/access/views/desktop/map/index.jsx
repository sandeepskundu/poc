import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import AccessMapsList from 'aio-app-ui-access-templates/maps-list';

const DESKTOPSRP = (props) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appPage={<AccessMapsList {...props} />}
        />
    )
}

export default DESKTOPSRP;