import { useState } from 'react';
import helpers from 'ui-helpers';
import mhelper from 'aio-app-ui-tdc-ds-modules';
import DsThemeListUi from 'aio-app-ui-tdc-ds-organisms/ds-theme-list-ui';
import DsThemeListHeader from 'aio-app-ui-tdc-ds-organisms/ds-theme-list-header';


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
        mhelper.api.themeListByDsHash.init(onResponse);
    }

    const ui = () => {
        return (
            <>
                <DsThemeListHeader {...props} details={details} />
                <DsThemeListUi {...props} details={details} />
            </>
        )
    }

    return ui();
}

export default Comp;