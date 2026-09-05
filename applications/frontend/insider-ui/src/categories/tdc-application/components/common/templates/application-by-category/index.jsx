import helpers from 'ui-helpers';
import React, {useState} from 'react';
import mhelper from 'aio-app-ui-tdc-application-modules';
import ApplicationListUi from 'aio-app-ui-tdc-application-organisms/application-list-ui';
import ApplicationListHeader from 'aio-app-ui-tdc-application-organisms/application-list-header';

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
        mhelper.api.appListByCategory.init(onResponse);
    }

    const ui = () => {
        return (
            <>
                <ApplicationListHeader {...props} details={details} />
                <ApplicationListUi {...props} details={details} />
            </>
        )
    }

    return ui();
}

export default Comp;