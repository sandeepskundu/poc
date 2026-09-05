import Md5Child from './child';
import helpers from 'ui-helpers';
import React, {useEffect, useState, useRef} from 'react';

import SchemaValuemap from 'aio-app-ui-api-molecules/model-schema-valuemap';
import AddNewHashLink from 'aio-app-ui-api-molecules/model-config/md5-hash/add-new-hash';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(16);
    const md5Hash = helpers.json.val(props, 'details.model.md5Hash', {});

    const [data, setData] = useState({
        expended:{
            child:'',
            parent:'name.middle',
        },
        details:md5Hash  
    });

    useEffect(() => {
        if(props.onChange){
            props.onChange(data.details || {}, 'md5Hash')
        }
    }, [data])

    const heading = () => {
        return <p className='txt-md fm-md full bxs mr-b10'>Md5 Hash</p>
    }

    const isexpended = (map, type) => {
        const expended = helpers.json.val(data, `expended.${type}`, '');

        return (expended === map);
    }

    const toggle = (map, type) => {
        let d = helpers.json.copy(data);
        let exp = isexpended(map, type);
            d.expended[type] = exp?'':map;
            setData(d);
    }

    const onChange = (arg,  map, type) => {
        let d = helpers.json.copy(data);
            d.details = arg;

            if(type){
                d.expended = d.expended || {};
                d.expended[type] = map.join('.');
            }
            
            setData(d);
    }

    const onRemove = (map, type) => {
        let d = helpers.json.copy(data);
            d.details = d.details || {};
            d.expended = d.expended || {};
            d.expended[type] = '';
            delete d.details[map];
            setData(d);
    }

    const header = (node) => {
        return (
            <div className='full bxs pd-tb10'>
                <div className='full bxs flx-sb'>
                    <ul className='bxs flx-vc flx-sb'>
                        <li className='pd-r10 txt-sm'>{node}</li>
                    </ul>
                    <ul className='bxs flx-vc'>
                        <AddNewHashLink 
                            modified={data}
                            onChange={onChange}
                            configs={props.configs}
                            details={props.details}
                        />
                        <li className='pd-l10 cp txt-xs link-u ns'><span onClick={() => onRemove(node, 'parent')}>Remove</span></li>
                        <li className='pd-l10 cp txt-xs link-u ns'><span onClick={() => toggle(node, 'parent')}>{isexpended(node, 'parent')?'Collapse':'Expend'}</span></li>
                    </ul>
                </div>
            </div>
        )
    }

    const details = (map) => {
        const exp = isexpended(map, 'parent');

        if(exp){
            return (
                <>
                    <SchemaValuemap 
                        mapping={map}
                        modified={data}
                        onChange={onChange}
                        configs={props.configs}
                        details={props.details}
                    />
                    <Md5Child
                        mapping={map}
                        modified={data}
                        onExpend={toggle}
                        onChange={onChange}
                        configs={props.configs}
                        details={props.details}
                    />
                </>
            )
        }else{
            return <></>
        }
    }

    const childWrapperCls = (i) => {
        let rval = ['full bdr-c00104 bdr-1 bdr-wrln bdr-wbn pd-rl10 bxs']
        let odd = helpers.is.odd(i);

        if(odd){
            rval.push('bg-c00102');
        };

        return rval.join(' ');
    }

    const addNewLink = (id) => {
        return (
            <p className='full bxs txt-sm'>Md5Hash is not added till now, <label className="link-u ns cp link-u ns" htmlFor={id}>click here</label> to start adding.</p>
        )
    }

    const childs = () => {
        const d = helpers.json.val(data, 'details', {})
        const li = helpers.json.keys(d);

        if(li && li.length > 0){
            return li.map((name, i) => {
                return (
                    <div className={childWrapperCls(i)} key={id+i}>
                        {header(name)}
                        {details(name)}
                    </div>
                )
            })
        }else{
            return (
                <div className='full bxs'>
                    <AddNewHashLink 
                        modified={data}
                        label={addNewLink}
                        onChange={onChange}
                        configs={props.configs}
                        details={props.details}
                    />
                </div>
            )
        }
    }

    const ui = () => {
        return (
            <div className='full bxs pd-rl20 pd-t20'>
                {heading()}
                {childs()}
            </div>
        )
    }

    return ui();
}


export default Comp;