import helpers from 'ui-helpers';
import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import DesignSystemDetails from 'aio-app-ui-tdc-ds-templates/ds-details';


const PageView = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    
    return (
        <LayoutBuilder
            appMenu={''}
            appRightMenu={''}
            appPage={<DesignSystemDetails {...props} />}
        />
    )
}

export default PageView;