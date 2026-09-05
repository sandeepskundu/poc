import helpers from 'ui-helpers';
import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import MethodWrapper from 'aio-app-ui-tdc-application-templates/method-wrapper';

const PageView = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    
    return (
        <LayoutBuilder
            appMenu={''}
            appRightMenu={''}
            appPage={<MethodWrapper {...props} />}
        />
    )
}

export default PageView;