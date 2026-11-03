import helpers from 'ui-helpers';
import {useEffect, useState, useRef} from "react";
import FoundationColor from 'aio-app-ui-developer-molecules/foundation-colors';
import FoundationRadius from 'aio-app-ui-developer-molecules/foundation-radius';
import FoundationShadows from 'aio-app-ui-developer-molecules/foundation-shadows';
import FoundationTypography from 'aio-app-ui-developer-molecules/foundation-typography';

const Comp = (props) => {
    const hash = helpers.json.get(_siteProps_, 'router.params.hash', '');

    const [enums, setEnums] = useState({
        data:{},
        blank:true,
        key:helpers.random.key()
    });

    useEffect(() => {
        console.log(enums);
    }, [enums])

    const onResp = (resp) => {
        let d = helpers.json.copy(enums);
            d.blank = false;
            d.key = helpers.random.key();
            d.data = helpers.json.get(resp, 'data.data', {});
            setEnums(d);
    }

     helpers.react.hooks.onmount(useRef(false), useEffect, () => {
        helpers.request.init({
            'url': 'http://localhost:5000/api/props-engine/ds/enums/v1/list/fetch'
        }, onResp)
    });

    const ui = () => {
        switch (hash) {
            case 'colors':
                return <FoundationColor />
            break;
            case 'typography':
                return <FoundationTypography {...enums} />
            break;
            case 'shadows':
                return <FoundationShadows {...enums} />
            break;
            case 'radius':
                return <FoundationRadius {...enums} />
            break;
        }
    }

    return ui();
}

export default Comp;