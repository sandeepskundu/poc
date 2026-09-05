import helpers from 'ui-helpers';
import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import DsThemeList from 'aio-app-ui-tdc-ds-templates/ds-theme-list';


const PageView = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    
    return (
        <LayoutBuilder
            appMenu={''}
            appRightMenu={''}
            appPage={<DsThemeList {...props} />}
        />
    )
}

export default PageView;