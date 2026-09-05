import helpers from 'ui-helpers';
import Button from 'aio-global-ui/atoms/form/button';
import React, {useEffect, useState, useRef} from 'react';
import SchemaSampleOptions from 'aio-app-ui-tdc-application-atoms/model-schema-sample-options';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const valmap = helpers.json.val(props, 'mapping', '');
    const d = helpers.json.val(props, 'modified.details', {});
    const sample = helpers.json.val(props, 'configs.db.schema', {});

    const [details, setDetails] = useState(d);
    const [mapping, setMapping] = useState(valmap.split('.'));

    const schemaAsList = (arg) => {
        const rval = {};

        for(const a in arg){
            let isobj = helpers.data.type.is(arg[a], 'object');
            let isstring = helpers.data.type.is(arg[a], 'string');
            let isboolean = helpers.data.type.is(arg[a], 'boolean');
    
                rval[a] = {
                    'id':a,
                    'label':helpers.string.transform.camelize(a)
                }
        
                if(isobj){
                    rval[a].childs = schemaAsList(arg[a])
                }
        }
    
        return rval;
    }

    const options = schemaAsList(sample);

    const onChange = (map) => {
        let d = {};

        if(props.new){
            d[map.join('.')] = {
                nodes:{
                    0:{
                        map:"",
                        from:"",
                        fallback:{
                            map: '', 
                            from: 'env'
                        }
                    }
                }
            }
            setDetails(d);
            setMapping(map);
        }else{
                d = helpers.json.copy(details);
            let ov = d[valmap] || {};
                d[map.join('.')] = {...ov};
                delete d[valmap];
        }

        if(props.onChange){
            props.onChange(d, map, 'parent');
        }
    }

    const schemaCls = () => {
        const rval = ['bxs mr-b20'];

        if(props.new){
            rval.push('full')
        }else{
            rval.push('grid pd-r20')
        }

        return rval.join(' ');
    }

    const schema = (map, current, last) => {
        let d = [...map];
        let mv = [...map];
        let m = map.join('.');
        let opts = {...options};
            d.pop();

        if(map.length > 1){
            m = map.join('.childs.');
            mv = mv.join('.childs.');
            mv = mv.split('.');
            mv.pop();
            opts = helpers.json.val(opts, mv.join('.'));
        };

        const childs = helpers.json.val({...options}, `${m}.childs`);

        if(opts){
            if(childs && last){
                return (
                    <>
                        <div className={schemaCls()}>
                            <SchemaSampleOptions
                                options={opts}
                                valuemap={valmap}
                                current={current}
                                mapping={[...map]}
                                onChange={onChange}
                                configs={props.configs}
                                details={props.details}
                                modified={props.modified}
                            />
                        </div>
                        <div className={schemaCls()}>
                            <SchemaSampleOptions
                                options={childs}
                                current={current}
                                valuemap={valmap}
                                mapping={[...map]}
                                onChange={onChange}
                                configs={props.configs}
                                details={props.details}
                                modified={props.modified}
                            />
                        </div>
                    </>
                )
            }else{
                return (
                    <div className={schemaCls()}>
                        <SchemaSampleOptions
                            options={opts}
                            valuemap={valmap}
                            current={current}
                            mapping={[...d]}
                            onChange={onChange}
                            configs={props.configs}
                            details={props.details}
                            modified={props.modified}
                        />
                    </div>
                )
            }
        }else{
            return <></>
        }
    }

    const list = (opts) => {
        if(mapping && mapping.length > 0){
            const m = [];
            return mapping.map((name, i) => {
                m.push(name);
                return schema(m, name, (mapping.length === parseInt(i)+1))
                   
            })
        }else{
            return <></>
        }
    }

    const wrapperCls = () => {
        const rval = ['full bxs'];

        if(props.new){

        }else{
            rval.push('grid-wrapper grid-layout-6 mr-t10');
        }

        return rval.join(' ');
    }

    const header = () => {
        if(props.new){
            return (
                <div className='full mr-b10'>
                    <p className='txt-md fm-md full bxs'>Add new map</p>
                    <p className='full bxs txt-xs'>{mapping.join('.')}</p>
                </div>
            )
        }else{
            return <></>
        }
    }

    const save = (type) => {
        if(type === 'reset' || type === 'cancel'){
            setDetails(d);
            setMapping(valmap.split('.'));
        }

        if(props.onAction){
            props.onAction(mapping, type);
        }
    }

    const buttons = () => {
        if(props.showActions){
            return (
                <ul className='full grid-wrapper grid-layout-3 bxs pd-t10 flx-vc'>
                    <li className='grid pd-l14 bxs'>
                        <span className='link-u cp txt-sm fl'
                            onClick={() => {
                                save('reset')
                            }}
                        >Reset</span>
                    </li>
                    <li className='grid pd-l14 bxs'>
                        <Button 
                            label='Cancel'
                            buttonDs={{
                                size:"md",
                                theme:'002'
                            }}
                            onClick={() => {
                                save('cancel')
                            }}
                        />
                    </li>
                    <li className='grid pd-l14 bxs'>
                        <Button 
                            label='Save'
                            buttonDs={{
                                size:"md",
                                theme:'000'
                            }}
                            onClick={() => {
                                save('save')
                            }}
                        />
                    </li>
                </ul>
            )
        }
    }

    const ui = () => {
        return (
            <div className={wrapperCls()}>
                {header()}
                {list()}
                {buttons()}
            </div>
        )
    }

    return ui();
}

export default Comp;