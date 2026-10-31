import helpers from 'ui-helpers';
import appHelpers from 'app-helpers';
import {useEffect, useState, useRef, useCallback} from "react";
import CreateComponent from 'aio-app-ui-developer-templates/ui-component/create';
import UpdateComponent from 'aio-app-ui-developer-templates/ui-component/update';

const reqConfig = (url) => ({
    name: url,
    request: {
        options: {},
        request: {}
    }
});

const Comp = (props) => {
    const action = helpers.json.get(_siteProps_, 'router.params.action', '');
    const compHash = helpers.json.get(_siteProps_, 'router.params.hash', '');

    const [details, setDetails] = useState({
        enums: {},
        blank: true,
        compTree: {},
        predefined: {}
    });

    const onPropResponse = useCallback((resp, compList) => {
        setDetails((prev) => ({
            ...prev,
            blank: false,
            compListMap: compList.components || {},
            enums: helpers.json.get(resp, 'enums', {}),
            compTree: helpers.json.get(resp, 'compTree', {}),
            predefined: helpers.json.get(resp, 'predefined', {}),
            componentMap:(action === 'create')?'':helpers.json.get(compList, `components.${compHash}`, '')
        }));
    }, []);

    const onResp = useCallback((resp) => {
        appHelpers.store.get([reqConfig('storybook.ds.enums'), reqConfig('storybook.ds.predefined'), reqConfig('storybook.components.tree')], (res) => {
            onPropResponse(res, resp)
        });
    }, [onPropResponse]);

    helpers.react.hooks.onmount(useRef(false), useEffect, () => { appHelpers.store.get([reqConfig('storybook.components.list.map')], onResp) });

    const ui = () => {
        switch (action) {
            case 'update':
                return <UpdateComponent {...props} details={details} />
            break;
            case 'create':
                return <CreateComponent {...props} details={details} />
            break;
        }
       
    }

    return ui()
}

export default Comp;