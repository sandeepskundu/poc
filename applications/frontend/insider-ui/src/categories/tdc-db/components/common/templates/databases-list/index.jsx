import helpers from 'ui-helpers';
import React, {useState} from 'react';
import mhelper from 'aio-app-ui-tdc-db-modules';
import DatabaseListUi from 'aio-app-ui-tdc-db-organisms/database-list-ui';
import DatabaseListHeader from 'aio-app-ui-tdc-db-organisms/database-list-header';

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
        mhelper.api.dbListByMarchent.init(onResponse);
    }

    const ui = () => {
        return (
            <>
                <DatabaseListHeader {...props} details={details} />
                <DatabaseListUi {...props} details={details} />
            </>
        )
    }

    return ui();
}

export default Comp;