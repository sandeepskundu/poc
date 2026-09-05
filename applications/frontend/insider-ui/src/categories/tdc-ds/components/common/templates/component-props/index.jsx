import configs from './configs';
import helpers from 'ui-helpers';
import appHelpers from 'app-helpers';
import {useEffect, useState, useRef} from 'react';
import DsAttributes from 'aio-app-ui-templates/design-system-attributes'
import ComponentPropsHeader from 'aio-app-ui-tdc-ds-organisms/components-props-header';
import ComponentPropsDetails from 'aio-app-ui-tdc-ds-organisms/components-props-details';

const Comp = (dprops) => {
    const id = helpers.random.id(10);

    const rumtimeData = {
        body:{},
        data:{},
        query:{},
        props:{},
        params:{}
    }

    const dvals = {
        blank:true,
        expended:{
            child:'',
            current:'',
            valuemap:''
        },
        configs:configs,
        details:{
            data:{
                details:{
                    name:'base',
                    description:''
                },
                _configs:{
                    ds:{
                        aioDsConfigs:{
                            type:'object',
                            description:"Details description about prop",
                            required:{
                                ui:'required',
                                server:'required',
                                storybook:'required'
                            },
                            schema:{
                                ui:'', //
                                sample:'',
                                server:'',
                                storybook:'',
                            },
                            props:{},
                            valuemap:{
                                map:'',
                                from:'',
                                fallback:{},
                                default:{
                                    value:'kundu'
                                }
                            }
                        },
                        aioDsChilds:{
                            sandeep:{
                                aioDsConfigs:{
                                    type:'object',
                                    description:"Details description about prop",
                                    required:{
                                        ui:'required',
                                        server:'required',
                                        storybook:'required'
                                    },
                                    schema:{
                                        ui:'', //
                                        sample:'',
                                        server:'',
                                        storybook:'',
                                    },
                                    values:{}
                                },
                                aioDsChilds:{
                                    kundu:{
                                        aioDsConfigs:{
                                            type:'object',
                                            description:"Details description about prop",
                                            required:{
                                                ui:'required',
                                                server:'required',
                                                storybook:'required'
                                            },
                                        },
                                        schema:{
                                            ui:'', //
                                            sample:'',
                                            server:'',
                                            storybook:'',
                                        },
                                        values:{},
                                        aioDsChilds:{
                                            kinala:{
                                                aioDsConfigs:{
                                                    type:'design-system',
                                                    description:"Details description about prop",
                                                    required:{
                                                        ui:'required',
                                                        server:'required',
                                                        storybook:'required'
                                                    },
                                                },
                                                schema:{
                                                    ui:'', //
                                                    sample:'',
                                                    server:'',
                                                    storybook:'',
                                                },
                                                values:{}
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    const [cache, setCache] = useState(id);
    const [data, setData] = useState(dvals)
    const fristRender = helpers.react.state.frist(useRef(true), useEffect)();

    const onResp = (resp, arg) => {
        let d = helpers.json.copy(data);
        let id = helpers.json.val(_siteProps_, 'router.params.id', '');

            if(id){
                d.results = helpers.json.val(resp, 'parentComponentData', []);
            }else{
                d.results = helpers.json.val(resp, 'rootComponentsData', [])
            }

            d = helpers.json.merge(d, resp);
            d.blank = false;
            console.log(d);
            setData(d);
    }

    if(fristRender){
        let id = helpers.json.val(_siteProps_, 'router.params.id', '');

        if(id){
            appHelpers.store.get([{
                name:'componentDataByParentHashId'
            }, {
                name:'componentDataByHashId'
            }], onResp);
        }else{
            appHelpers.store.get([{
                name:'rootComponentsData'
            }], onResp);
        }
    }

    const onExpend = (map, type, arg) => {
        let t = type || 'current';
        let m = `expended.${t}`;
        let d = helpers.json.copy(arg || data);
        let cur = helpers.json.val(d, m, '');

        if(cur === map){
            d = helpers.json.set(d, m, '', false, true);
        }else{
            d = helpers.json.set(d, m, map, false, true)
        }

        setData(d);

        console.log(d, 'OnExpend');
    }

    const onDetailsChange = (arg, cb, reset) => {
        let d = helpers.json.copy(data);

            if(reset){
                helpers.json.remove(d, 'details');
            }

            d = helpers.json.set(d, 'details', arg, false, true);
            setData(d);

            console.log(JSON.stringify(d.details))
            console.log(d, 'onDetailsChange')

            if(cb){
                setTimeout(() => {cb(d)}, 200);
            }
    }

    return (
        <>
            <DsAttributes 
            
            />
            <ComponentPropsHeader 
                {...data} 
                key={`${cache}ph`}
                runtimeData={rumtimeData}
            />
            <ComponentPropsDetails 
                {...data}
                key={cache}
                runtimeData={rumtimeData}
                onChange={onDetailsChange}
                onExpend={(map, type, d) => {onExpend(map, (type || 'current'), d)}} 
            />
        </>
    )
}

export default Comp 