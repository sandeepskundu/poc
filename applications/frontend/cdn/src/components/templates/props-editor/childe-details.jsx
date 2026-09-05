import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import PropsEditor from 'aio-app-ui-templates/props-editor'
import PropMapper from 'aio-app-ui-organisms/props-editor/prop-mapper';

const ChildDetails = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(10);
    const [map, setMap] = useState(false);
    const [expend, setExpend] = useState(true);
    const sel = helpers.json.val(props, 'selected', []);

    const maping = () => {
        if(sel && sel.length > 1 && map){
            return <p className='txt-xxs'>{sel.join('.')}</p>
        }

        return <></>
    }

    const type = () => {
        const name = helpers.json.val(props, 'name');
        const rv = helpers.json.val(props, `schema.config.${name}.type`);

        return rv;
    }

    const add = () => {
        let ty = type();
        let map = {
            'object':true
        }

        if(map[ty]){
            return <li className='pd-r10 cp txt-xs link-u ns'>Add key</li>
        }else{
            return <></>
        }
    }

    const header = () => {
        return (
            <div className='full bxs pd-t10'>
                {maping()}
                <div className='full bxs flx-sb pd-b10'>
                    <ul className='bxs flx-vc flx-sb'>
                        <li className='pd-r10 txt-sm'>{helpers.json.val(props, 'name')}</li>
                    </ul>
                    <ul className='bxs flx-vc'>
                        {(sel && sel.length > 1)?<li className='pd-r10 cp txt-xs link-u ns' onClick={() => {setMap(!map)}}>{map?'Hide map':'View Map'}</li>:<></>}
                        <li className='pd-r10 cp txt-xs link-u ns' onClick={() => {setExpend(!expend)}}>{expend?'Collapse':'Expend'}</li>
                        {add()}
                        <li className='pd-r10 cp txt-xs link-u ns'>Configs</li>
                        <li className='pd-r10 cp txt-xs link-u ns'>Values</li>
                    </ul>
                </div>
            </div>
        )
    }

    const footer = () => {
        return (
            <div className='full bxs pd-t10'>
                <div className='full bxs flx-sb pd-b10'>
                    <ul className='bxs flx-vc flx-sb'>
                        <li className='pd-r10 txt-sm'>&nbsp;</li>
                    </ul>
                    <ul className='bxs flx-vc'>
                        {add()}
                        
                        <li className='pd-r10 cp txt-xs link-u ns'>Configs</li>
                        <li className='pd-r10 cp txt-xs link-u ns'>Values</li>
                    </ul>
                </div>
            </div>
        )
    }

    const selected = (key, conf, value) => {
        let sel = helpers.json.val(props, 'selected', []);
        let rsel = [...sel]
            rsel.push(key)
        return rsel;
    }

    const onChange = (arg, vmap, vtype) => {
        if(props.onChange){
            props.onChange(arg, vmap, vtype);
        }
    }

    const view = (value, conf, key) => {
        const type = helpers.json.val(conf, 'type');
        switch(type) {
            case 'object':
                return (
                    <PropsEditor 
                        data={props.data}
                        configs={props.configs}
                        selected={props.selected}
                        onChange={(arg, vm, vt) => {onChange(arg, vm, vt)}}
                        schema={helpers.json.val(props, 'details', {})}
                    />
                )
            break;
            case 'design-system':
                return (
                    <PropMapper 
                        details={{
                            name:key,
                            value:value,
                            config:conf
                        }} 
                        data={props.data}
                        configs={props.configs}
                        selected={selected(key, conf, value)}
                        onChange={(arg, vm, vt) => {onChange(arg, vm, vt)}}
                    />
                )
            break;
            case 'string':
                return (
                    <PropMapper 
                        details={{
                            name:key,
                            value:value,
                            config:conf
                        }} 
                        data={props.data}
                        configs={props.configs}
                        selected={selected(key, conf, value)}
                        onChange={(arg, vm, vt) => {onChange(arg, vm, vt)}}
                    />
                )
            break;
            case 'boolean':
                return (
                    <PropMapper 
                        details={{
                            name:key,
                            value:value,
                            config:conf
                        }} 
                        data={props.data}
                        configs={props.configs}
                        selected={selected(key, conf, value)}
                        onChange={(arg, vm, vt) => {onChange(arg, vm, vt)}}
                    />
                )
            break;
            case 'number':
                return (
                    <PropMapper 
                        details={{
                            name:key,
                            value:value,
                            config:conf
                        }} 
                        data={props.data}
                        configs={props.configs}
                        selected={selected(key, conf, value)}
                        onChange={(arg, vm, vt) => {onChange(arg, vm, vt)}}
                    />
                )
            break;
            default:  
        }
    }

    const preview = () => {

        if(expend){
            const pd = helpers.json.val(props, 'details.props', {});
            const pl = helpers.json.val(props, 'details.config', {});
            const li = helpers.json.keys(pl);
                li.sort();
            
            if(li.length > 0){
                return li.map((name, i) => {
                    return (
                        <div className='full bxs' key={id+i}>
                            {view(pd[name], pl[name], name)}
                        </div>
                    )
                })
            }

            return (
                <div className='full bxs'>
                    <PropsEditor 
                        data={props.data}
                        configs={props.configs}
                        selected={props.selected}
                        schema={helpers.json.val(props, 'details', {})}
                    />
                </div>
            )
        }

        return <></>
    }

    const ui = () => {
        return (
            <>
                <div className='full bxs'>
                    {header()}
                    {preview()}
                    {footer()}
                </div>
            </>
        )
    }

    return (
        <>
            {ui()}
        </>
    )
}

export default ChildDetails;