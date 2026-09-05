import { useState } from 'react';
import helpers from 'ui-helpers';
import mhelper from 'aio-app-ui-tdc-ds-modules';
import DesignSystemDetailsUi from 'aio-app-ui-tdc-ds-organisms/ds-details-ui';
import DesignSystemDetailsHeader from 'aio-app-ui-tdc-ds-organisms/ds-details-header';


const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const [fresh, setFresh] = useState(true);
    const [details, setDetails] = useState({
        blank:false
    });

    const onResponse = (resp) => {
        setDetails(resp);
    }

    if(fresh){
        setFresh(false);
        //mhelper.api.designsSystemsList.init(onResponse);
    }

    const ui = () => {
        return (
            <>
                <DesignSystemDetailsHeader {...props} details={details} />
                <DesignSystemDetailsUi {...props} details={details} />
            </>
        )
    }

    return ui();
}

export default Comp;