import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import ButtonGroup from 'aio-app-ui-components-templates/button-group';

const DESKTOPSRP = (dprops) => {
    return (
        <LayoutBuilder
            appMenu={''}
            _appRightMenu={null}
            appPage={() => {
                return <ButtonGroup />
            }}
        />
    )
}

export default DESKTOPSRP;