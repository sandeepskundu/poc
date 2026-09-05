import helpers from 'ui-helpers';
import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import ControllerWrapper from 'aio-app-ui-tdc-application-templates/controller';

const PageView = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    
    return (
        <LayoutBuilder
            appMenu={''}
            appRightMenu={''}
            appPage={<ControllerWrapper {...props} />}
        />
    )
}

export default PageView;