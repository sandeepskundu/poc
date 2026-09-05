import helpers from 'ui-helpers';
import appHelpers from 'app-helpers';
import {useEffect, useState, useRef} from 'react';
import AccessRolesListUi from 'aio-app-ui-access-organisms/access-roles-list-ui';
import AccessRolesListHeader from 'aio-app-ui-access-organisms/access-roles-list-header';

const Comp = (dprops) => {
    const id = helpers.random.id(10);

    const dvals = {
        blank:true,
        configs:{
            exposed:{
                options:{
                    0:{
                        id:'internally',
                        label:'Internally'
                    },
                    1:{
                        id:'public',
                        label:'Publically'
                    }
                }
            }
        }
    }

    const [data, setData] = useState(dvals)
    const fristRender = helpers.react.state.frist(useRef(true), useEffect)();

    const onResp = (resp, arg) => {

        let d = helpers.json.copy(data);
        let id = helpers.json.val(_siteProps_, 'router.params.id', '');

        if(id){
            d.results = helpers.json.val(resp, 'childRolesByParentHashId', []);
        }else{
            d.results = helpers.json.val(resp, 'rootRoles', [])
        }

        d = helpers.json.merge(d, resp);
        d.blank = false;
        setData(d);
    }

    if(fristRender){
        let id = helpers.json.val(_siteProps_, 'router.params.id', '');

        if(id){
            appHelpers.store.get([{
                name:'access.roles.childRolesByParentHashId'
            }, {
                name:'access.roles.roleDataByHash'
            }], onResp);
        }else{
            appHelpers.store.get([{
                name:'access.roles.rootRoles'
            }], onResp);
        }
    }

    return (
        <>
            <AccessRolesListHeader {...data} />
            <AccessRolesListUi {...data} />
        </>
    )
}

export default Comp 