import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import PropDescription from 'aio-app-ui-atoms/props-editor/prop-description';
import SchemaTypes from 'aio-app-ui-atoms/schema-editor/schema-types';
import AllInOneFlags from 'aio-app-ui-atoms/schema-editor/schema-flags/all-in-one';

const PropMapper = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    const sel = helpers.json.val(props, 'selected', []);

    const [map, setMap] = useState(false);
    const [expend, setExpend] = useState(true);

    const onChange = (arg, vmap) => {
        if(props.onChange){
            props.onChange(arg, vmap);
        }
    }

    const view = () => {
        if(expend){
            return (
                <div className='full bxs pd-b24 pd-t10'>
                    <ul className='full bxs grid-wrapper'>
                        <li className='grid-w2 bxs pd-r16'>
                            <SchemaTypes
                                key={props.key}
                                onChange={(arg, vm, vt) => {onChange(arg, vm, vt)}}
                                configs={helpers.json.val(props, 'configs', {})}
                                details={helpers.json.val(props, 'details', {})}
                                selected={helpers.json.val(props, 'selected', [])}
                            />
                        </li>
                        <li className='grid-w10 bxs'>
                            <PropDescription
                                key={props.key}
                                data={helpers.json.val(props, 'data', {})}
                                onChange={(arg, vm, vt) => {onChange(arg, vm, vt)}}
                                configs={helpers.json.val(props, 'configs', {})}
                                details={helpers.json.val(props, 'details', {})}
                                selected={helpers.json.val(props, 'selected', [])}
                            />
                        </li>
                    </ul>
                    <AllInOneFlags
                        key={props.key}
                        onChange={(arg, vm, vt) => {onChange(arg, vm, vt)}}
                        configs={helpers.json.val(props, 'configs', {})}
                        details={helpers.json.val(props, 'details', {})}
                        selected={helpers.json.val(props, 'selected', [])}
                    />
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
            <div className='full bxs pd-t10 hide'>
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
            <div className='full bxs bdr-c00104 bdr-01 bdr-wrln bdr-wbn pd-rl4'>
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