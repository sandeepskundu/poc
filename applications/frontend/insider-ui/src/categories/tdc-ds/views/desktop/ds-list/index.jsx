import helpers from 'ui-helpers';
import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import DesignSystemList from 'aio-app-ui-tdc-ds-templates/ds-list';


const PageView = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    
    return (
        <LayoutBuilder
            appMenu={''}
            appRightMenu={''}
            appPage={<DesignSystemList {...props} />}
        />
    )
}

export default PageView;