import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import Typography from 'aio-app-ui-components-templates/typography';

const DESKTOPSRP = (dprops) => {
    return (
        <LayoutBuilder
            appMenu={''}
            _appRightMenu={null}
            appPage={() => {
                return <Typography />
            }}
        />
    )
}

export default DESKTOPSRP;