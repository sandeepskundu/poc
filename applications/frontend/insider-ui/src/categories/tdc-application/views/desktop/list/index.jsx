import helpers from 'ui-helpers';
import ApplicationByCategory from 'aio-app-ui-tdc-application-templates/application-by-category';
import LayoutBuilder from 'aio-app-ui-templates/page-layout';

const PageView = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    
    return (
        <LayoutBuilder
            appMenu={''}
            appRightMenu={''}
            appPage={<ApplicationByCategory {...props} />}
        />
    )
}

export default PageView;