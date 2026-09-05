import { useState } from 'react';
import helpers from 'ui-helpers';
import mhelper from 'aio-app-ui-tdc-ds-modules';
import DesignSystemListUi from 'aio-app-ui-tdc-ds-organisms/ds-list-ui';
import DesignSystemListHeader from 'aio-app-ui-tdc-ds-organisms/ds-list-header';


const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const [fresh, setFresh] = useState(true);
    const [details, setDetails] = useState({
        list:[],
        blank:true
    });

    const onResponse = (resp) => {
        setDetails(resp);
    }

    if(fresh){
        setFresh(false);
        mhelper.api.designsSystemsList.init(onResponse);
    }

    const ui = () => {
        return (
            <>
                <DesignSystemListHeader {...props} details={details} />
                <DesignSystemListUi {...props} details={details} />
            </>
        )
    }

    return ui();
}

export default Comp;