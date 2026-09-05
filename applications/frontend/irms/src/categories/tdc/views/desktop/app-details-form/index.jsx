import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import AppDetailsForm from 'aio-app-ui-tdc-templates/app-details-form';

const DESKTOPSRP = (props) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appPage={<AppDetailsForm {...props} />}
        />
    )
}

export default DESKTOPSRP;