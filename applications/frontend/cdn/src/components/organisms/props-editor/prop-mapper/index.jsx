import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import Ds from 'aio-app-ui-templates/design-system';
import PropValue from 'aio-app-ui-atoms/props-editor/prop-value';
import PropTypes from 'aio-app-ui-atoms/props-editor/prop-types';
import PropRequired from 'aio-app-ui-atoms/props-editor/prop-required';
import PropDescription from 'aio-app-ui-atoms/props-editor/prop-description';

const PropMapper = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(10);
    const sel = helpers.json.val(props, 'selected', []);

    const [map, setMap] = useState(false);
    const [expend, setExpend] = useState(true);

    const onChange = (arg, vmap, vtype) => {
        if(props.onChange){
            props.onChange(arg, vmap, vtype);
        }
    }

    const viewByType = () => {
        const type = helpers.json.val(props, 'details.config.type');

        switch(type) {
            case 'design-system':
                return (
                    <>
                        <Ds 
                            layout="page"
                            dsProps={{
                                attrs:{},
                                dataAttrs:{},
                                ds:{
                                    "theme":{
                                        "colorPairing":{
                                            "default":"000",
                                            "hover":"002",
                                        },
                                        "background":{
                                            "default":"",
                                            "hover":""
                                        },
                                        "text":{
                                            "default":"",
                                            "hover":""
                                        },
                                        "border":{
                                            "default":"",
                                            "hover":""
                                        },
                                    },
                                    'css':{
                                        "class":{
                                            'shadow':'xs', // Done
                                            'radius':{ // Done
                                                "1":'2',
                                                "2":'4',
                                                "3":'6',
                                                "4":'8'
                                            },
                                            'padding':{ // Done
                                                "1":'12',
                                                "2":'14',
                                                "3":'16',
                                                "4":'18'
                                            },
                                            "margin":{ // Done
                                                "1":'6',
                                                "2":'8',
                                                "3":'10',
                                                "4":'12'
                                            },
                                            'borderNone':{ // Done
                                                "1":true,
                                                "3":true
                                            },
                                            'family':'', //Done
                                            'fontsize':'md', // Done
                                        },
                                        "flags":{
                                            'noBorder':true, //done
                                            'rounded':false, //done
                                            'disabled':false, //done
                                            'isDisplay':true, // done
                                            'boxSizing':false, // done
                                            'animation':'anim', //Done
                                            'noRadius':false //done
                                        },
                                        'others':'',
                                    }
                                }
                            }}
                        />
                    </>
                )
            break;
            default:
                return (
                    <div className='full bxs pd-t24'>
                        <PropValue
                            data={helpers.json.val(props, 'data', {})}
                            onChange={(arg, vm, vt) => {onChange(arg, vm, vt)}}
                            configs={helpers.json.val(props, 'configs', {})}
                            details={helpers.json.val(props, 'details', {})}
                            selected={helpers.json.val(props, 'selected', [])}
                        />
                    </div>
                )
        }
    }

    const view = () => {
        if(expend){
            return (
                <div className='full bxs pd-b24 pd-t10'>
                    <ul className='full bxs grid-wrapper'>
                        <li className='grid-w2 bxs pd-r16'>
                            <PropTypes
                                data={helpers.json.val(props, 'data', {})}
                                onChange={(arg, vm, vt) => {onChange(arg, vm, vt)}}
                                configs={helpers.json.val(props, 'configs', {})}
                                details={helpers.json.val(props, 'details', {})}
                                selected={helpers.json.val(props, 'selected', [])}
                            />
                        </li>
                        <li className='grid-w10 bxs'>
                            <PropDescription
                                data={helpers.json.val(props, 'data', {})}
                                onChange={(arg, vm, vt) => {onChange(arg, vm, vt)}}
                                configs={helpers.json.val(props, 'configs', {})}
                                details={helpers.json.val(props, 'details', {})}
                                selected={helpers.json.val(props, 'selected', [])}
                            />
                        </li>
                    </ul>
                    <div className='full bxs pd-t24'>
                        <PropRequired
                            data={helpers.json.val(props, 'data', {})}
                            onChange={(arg, vm, vt) => {onChange(arg, vm, vt)}}
                            configs={helpers.json.val(props, 'configs', {})}
                            details={helpers.json.val(props, 'details', {})}
                            selected={helpers.json.val(props, 'selected', [])}
                        />
                    </div>
                    {viewByType()}
                </div>
            )
        }else{
            return <></>
        }
        
    }

    const maping = () => {
        if(sel && sel.length > 1 && map){
            return <p className='txt-xxs'>{sel.join('.')}</p>
        }

        return <></>
    }

    const header = () => {
        return (
            <div className='full bxs pd-t10'>
                {maping()}
                <div className='full bxs flx-sb pd-b10'>
                    <ul className='bxs flx-vc flx-sb'>
                        <li className='pd-r10 txt-sm'>{helpers.json.val(props, 'details.name')}</li>
                    </ul>
                    <ul className='bxs flx-vc'>
                        {(sel && sel.length > 1)?<li className='pd-r10 cp txt-xs link-u ns' onClick={() => {setMap(!map)}}>{map?'Hide map':'View Map'}</li>:<></>}
                        <li className='pd-r10 cp txt-xs link-u ns' onClick={() => {setExpend(!expend)}}>{expend?'Collapse':'Expend'}</li>
                        <li className='pd-r10 cp txt-xs link-u ns'>Json</li>
                        <li className='pd-r10 cp txt-xs link-u ns'>Configs</li>
                        <li className='pd-r10 cp txt-xs link-u ns'>Values</li>
                    </ul>
                </div>
            </div>
        )
    }

    const ui = () => {
        return (
            <div className='full bxs bdr-c00104 bdr-1 bdr-wrln bdr-wbn pd-rl4'>
                {header()}
                <div className='full bxs'>
                    {view()}
                </div>
            </div>
        )
    }

    return ui()
}

export default PropMapper;