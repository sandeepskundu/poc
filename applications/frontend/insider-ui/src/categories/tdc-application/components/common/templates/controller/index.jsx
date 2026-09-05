import helpers from 'ui-helpers';
import appHelpers from 'app-helpers';
import React, {useState, useRef, useEffect} from 'react';
import ControllerHeader from 'aio-app-ui-tdc-application-organisms/controller-header';
import ControllerListUi from 'aio-app-ui-tdc-application-organisms/controller-list-ui';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const fristRender = helpers.react.state.frist(useRef(true), useEffect)();

    const configs = {
        childsMap:{
            controller:'action',
            action:'version',
            version:'job',
            job:'method',
            method:'update'
        }
    }

    const [details, setDetails] = useState({
        data:{},
        blank:true
    });

    const onResp = (resp, arg) => {
        let d = helpers.json.copy(details);
            d.data = resp;
            d.blank = false;
            setDetails(d);
    }

    const list = [
        {
            name:'appDetailsById'
        }
    ]

    if(fristRender){
        let type = helpers.json.val(_siteProps_, 'router.params.type', '');
        let result = {
            name:'conrtollerChildByParentId',
            request:{
                responseDataMap:{
                    "to":"results",
                },
            }
        }

        switch (type) {
            case 'controller':
                result.name = 'controllerByAppId';
            break;
            default:
                list.push({
                    name:'controllerDetailsByhHashId'
                });
        };

        list.push(result);
        appHelpers.store.get(list, onResp);
    }

    const ui = () => {
        return (
            <>
                <ControllerHeader {...props} configs={configs} details={details} />
                <ControllerListUi {...props} configs={configs} details={details} />
            </>
        )
    }

    return ui();
}

export default Comp;