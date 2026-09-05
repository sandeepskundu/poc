import helpers from 'ui-helpers';
import React, {useEffect, useState} from 'react';
import Toggle from 'aio-global-ui/atoms/form/toggle';
import SchemaValuemap from 'aio-app-ui-api-molecules/model-schema-valuemap';
import AddNewHashLink from 'aio-app-ui-api-molecules/model-config/md5-hash/add-new-hash';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(16);
    const response = helpers.json.val(props, 'details.model.response', {});
    const exclude = helpers.json.val(props, 'details.model.response.exclude', {});
    const valuemaps = helpers.json.val(props, 'details.model.response.exclude.kies', {})
    const enabled = helpers.json.val(props, 'details.model.response.exclude.enable', {});

    const [expended, setExpended] = useState('');

    const heading = () => {
        return <p className='txt-md fm-md full bxs mr-b10'>Exclude from response</p>
    }

    const isexpended = (node) => {
        return (expended === node);
    }

    const toggle = (node) => {
        if(isexpended(node)){
            setExpended('')
        }else{
            setExpended(node)
        }
    }

    const onSchemaChange = (arg, map, name) => {
        const vm = map.join('.');

        if(valuemaps[vm]){

        }else{
            let d = helpers.json.copy(valuemaps);
                d[vm] = true;

                if(name){
                    delete d[name];
                }

                onChange(d);
        }
        setExpended(vm);
    };

    const onChange = (arg) => {
        let res = helpers.json.copy(response);
        let exc = helpers.json.copy(exclude);
            exc.kies = arg;
            res.exclude = exc

            if(props.onChange){
                props.onChange(res, 'response');
            }
    }

    const onToggle = (checked) => {
        let res = helpers.json.copy(response);
            res.exclude.enable = checked;

            if(checked){
                res.exclude.kies = {};
            }else{
                delete res.exclude.kies
            }

            if(props.onChange){
                props.onChange(res, 'response');
            }
            
            
    }

    const remove = (name) => {
        let d = helpers.json.copy(valuemaps);
            delete d[name];
            onChange(d);
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
                            modified={{
                                details:valuemaps
                            }}
                            onChange={onAdd}
                            configs={props.configs}
                            details={props.details}
                        />
                        <li className='pd-l10 cp txt-xs link-u ns'><span onClick={() => remove(node)}>Remove</span></li>
                        <li className='pd-l10 cp txt-xs link-u ns'><span onClick={() => toggle(node)}>{isexpended(node)?'Collapse':'Expend'}</span></li>
                    </ul>
                </div>
            </div>
        )
    }

    const onAdd = (arg, map) => {
        onSchemaChange({}, map, false);
    }

    const details = (name) => {
        let exp = isexpended(name);

            if(exp){
                return (
                    <div className='full bxs pd-b20'>
                        <div className='full bxs pd-b16'>
                            <SchemaValuemap
                                modified={{}}
                                mapping={name}
                                configs={props.configs}
                                details={props.details}
                                onChange={(arg, map) => {onSchemaChange(arg, map, name)}}
                            />
                        </div>
                    </div>
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
            <p className='full bxs txt-sm'>Exclude response map is not added till now, <label className="link-u ns cp link-u ns" htmlFor={id}>click here</label> to start adding.</p>
        )
    }

    const tswitch = () => {
        return (
            <div className='full bxs'>
                <Toggle 
                    label={'Enabled'}
                    checked={enabled}
                    onChange={(checked) => {
                        onToggle(checked);
                    }}
                />
            </div>
        )
    }

    const childs = () => {
        const li = helpers.json.keys(valuemaps);

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
                        modified={{
                            details:valuemaps
                        }}
                        onChange={onAdd}
                        label={addNewLink}
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
                {tswitch()}
                
                {enabled?<div className='full bxs pd-t16'>{childs()}</div>:<></>}
            </div>
        )
    }

    return ui();
}


export default Comp;