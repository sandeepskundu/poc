import helpers from 'ui-helpers';
import React, {useState} from 'react';
import mhelper from 'aio-app-ui-tdc-db-modules';
import CollectionsListUi from 'aio-app-ui-tdc-db-organisms/collections-list-ui';
import CollectionsListHeader from 'aio-app-ui-tdc-db-organisms/collections-list-header';

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
        mhelper.api.collectionListByDbId.init(onResponse, {
            request:{
                params:{
                    dbId:helpers.json.val(_siteProps_, 'router.params.dbId', '')
                }
            }
        });
    }

    const ui = () => {
        return (
            <>
                <CollectionsListHeader 
                    {...props}
                    details={details}
                />
                <CollectionsListUi 
                    {...props}
                    details={details}
                />
            </>
        )
    }

    return ui();
}

export default Comp;