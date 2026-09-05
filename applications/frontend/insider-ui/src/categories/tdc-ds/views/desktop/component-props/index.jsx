import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import ComponentProps from 'aio-app-ui-tdc-ds-templates/component-props';

const PageView = (dprops) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appRightMenu={''}
            appPage={<ComponentProps/>}
        />
    )
}

export default PageView;