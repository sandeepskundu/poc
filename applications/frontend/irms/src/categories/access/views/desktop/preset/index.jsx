import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import PresetList from 'aio-app-ui-access-templates/preset-list';

const DESKTOPSRP = (props) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appPage={<PresetList {...props} />}
        />
    )
}

export default DESKTOPSRP;