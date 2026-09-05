import helpers from 'ui-helpers';
import appHelpers from 'app-helpers';
import mhelpers from 'aio-app-ui-tdc-db-modules';
import React, {useEffect, useState, useRef} from 'react';
import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import CollectionDetails from 'aio-app-ui-tdc-db-templates/collection-details';

const psConfig = {
    enums:{
        types:{
            0:{
                'id':"STATIC",
                'label':"Static"
            },
            2:{
                'id':'DYNAMIC',
                'label':'Dynamic'
            }
        }
    },
    match:{
        types:{
            0:{
                'id':"STATIC",
                'label':"Static"
            },
            2:{
                'id':'DYNAMIC',
                'label':'Dynamic'
            }
        }
    },
    boolean:{
        options:{
            0:{
                'id':true,
                'label':"True"
            },
            2:{
                'id':false,
                'label':'False'
            }
        }
    },
    switch:{
        options:{
            0:{
                'id':1,
                'label':'Switch on'
            },
            1:{
                'id':0,
                'label':"Switch off"
            },
        }
    },
    schemas:{
        actions:{
            0:{
                "id":"fetch",
                "label":"View"
            },
            1:{
                "id":"update",
                "label":"Update"
            },
            2:{
                "id":"create",
                "label":"Create"
            },
            3:{
                "id":"delete",
                "label":"Delete"
            }
        },
        types:{
            0:{
                "id":"nested",
                "label":"Nested"
            },
            1:{
                "id":"email",
                "label":"Email"
            },
            2:{
                "id":"date",
                "label":"Date"
            },
            3:{
                "id":"object",
                "label":"Object"
            },
            4:{
                "id":"switch",
                "label":"Switch"
            },
            5:{
                "id":"string",
                "label":"String"
            },
            6:{
                'id':"number",
                "label":"Number"
            },
            7:{
                'id':"boolean",
                "label":"Boolean"
            },
            8:{
                'id':"objectId",
                "label":"Object Id"
            },
            9:{
                'id':"paragraph",
                "label":"Paragraph"
            },
            10:{
                "id":"stringKey",
                "label":"String as key"
            }
        }
    }
}

const Comp = (dprops) => {
    const [cache, setCache] = useState('');
    const [config, setConfig] = useState({});
    const fristRender = helpers.react.state.frist(useRef(true), useEffect)();

    const onResp = (resp, arg) => {
        setCache(helpers.random.id(10));
        setConfig(helpers.json.merge(psConfig, resp));
    }

    const list = [
        {
            name:'databaseListByMarchent'
        }, {
            name:'appListByCategory',
            request:{
                request:{
                    params:{
                        category:'api'
                    }
                }
            }
        }, {
            name:'collectionListByDbId',
            request:{
                request:{
                    params:{
                        dbId:helpers.json.val(_siteProps_, 'router.params.dbId', '')
                    },
                }
            }
        }
    ]

    if(fristRender){
        let action = helpers.json.val(_siteProps_, 'router.params.action');

        if(action === 'update'){
            list.push({
                name:'collectionById'
            })
        };

        appHelpers.store.get(list, onResp);
    }

    const onUpdateResp = (res) => {
        window.location.reload();
        let d = helpers.json.copy(config, 'collDetails', {});
            d.collDetails = helpers.json.val(res, 'data', {});
            setCache(helpers.random.id(10));
            setConfig(d);
    }

    const update = (arg, action) => {
        if(action === 'update'){
            mhelpers.api.updateDatabase.init(onUpdateResp, {
                request:{
                    data:arg,
                    params:{
                        id:_siteProps_.router.params.id
                    }
                }
            });
        }
    }

    return (
        <LayoutBuilder
            appMenu={''}
            appRightMenu={''}
            appPage={
                <CollectionDetails
                    key={cache}
                    configs={config}
                    onUpdate={(arg, action) => {update(arg, action)}}
                    collDetails={helpers.json.val(config, 'collDetails', {})}
                />
            }
        />
    )
}

export default Comp;