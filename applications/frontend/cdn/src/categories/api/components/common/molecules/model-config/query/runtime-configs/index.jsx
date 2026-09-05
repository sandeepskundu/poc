
import helpers from 'ui-helpers';
import AddNewLink from './add-new-link';
import ChildDetail from './child-details';
import mhelpers from 'aio-app-ui-api-modules';
import React, {useEffect, useState, useRef} from 'react';

const RuntimeQueryConfigWrapper = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const query = helpers.json.val(props, 'query', {});

    const [actions, setAction] = useState({
        expended:''
    });

    const rebuild = (rval, map, reset, action) => {

        if(action === 'delete'){
            let vt = [...map];
            let vm = [...map];
                vm.splice(-1);
                vt.splice(-1);
                vt = vt.pop();

                switch (vt) {
                    case 'query':
                        rval = mhelpers.helpers.query.rebuild(rval, vm);
                    break;
                    case 'or':
                    case 'and':
                    case 'logical':
                        rval = mhelpers.helpers.query.logical.rebuild(rval, vm);
                    break;
                    default:
                }
        }

        return rval;
    }

    const onChange = (val, map, reset, action) => {
        let d = helpers.json.val(props, 'query', {});
            d = helpers.json.copy(d);

            if(action === 'add-new'){
                d = helpers.json.merge(d, val);
            }else{
                let vm = map.join('.');
                if(reset) {
                    helpers.json.remove(d, vm);
                }

                if(action != 'delete'){
                    d = helpers.json.set(d, vm, val);
                }else{
                    d = rebuild(d, map, reset, action)
                }
            }
        
            d = mhelpers.helpers.query.refine(d);

            if(props.onChange){
                props.onChange(d);
            }
    }

    const holderCls = (qp, valmap) => {
        let rv = ['full bxs bdr-c00104 bdr-1 bdr-wrln bdr-wbn'];

        if(valmap && valmap.length > 0){
            rv.push('pd-rl6');
        }

        return rv.join(' ')
    }

    const hasDetails = (qp) => {
        let rval = false
        let map = ['or', 'and', 'query', 'logical'];

        for(const a in map){
            if(qp[map[a]]){
                rval = true
                break;
            }
        }

        return rval;
    }

    const onAction = (val, action) => {
        let d = helpers.json.copy(actions);
            d[action] = val;
            setAction(d);
    }


    const queryDetails = (type, qp, valmap) => {
        let li = helpers.json.keys(qp);

        if(li && li.length > 0){
            return li.map((type, i) => {
                return (
                    <div className={holderCls(helpers.json.val(qp, type, {}), valmap)} key={i}>
                        <ChildDetail
                            type={type}
                            onAction={onAction}
                            actions={{...actions}}
                            details={props.details}
                            configs={props.configs}
                            modified={props.modified}
                            editable={props.editable}
                            mapping={[...valmap, type]}
                            query={helpers.json.val(qp, type, {})}
                            onChange={(arg, map, reset, action) => {onChange(arg, map, reset, action)}}
                        />
                    </div>
                );
            })
        }
    }

    const details = (type, qp, valmap) => {
        const hd = hasDetails(qp);
        const vmap = [...valmap, type];

        if(hd){
            return (
                <ChildDetail 
                    query={qp}
                    type={type}
                    mapping={vmap}
                    onAction={onAction}
                    actions={{...actions}}
                    details={props.details}
                    configs={props.configs}
                    modified={props.modified}
                    editable={props.editable}
                    onChange={(arg, map, reset, action) => {onChange(arg, map, reset, action)}}
                >
                    {ui(qp, vmap)}
                </ChildDetail>
            )
        }else{
            return (
                <ChildDetail 
                    query={qp}
                    type={type}
                    mapping={vmap}
                    onAction={onAction}
                    actions={{...actions}}
                    details={props.details}
                    configs={props.configs}
                    modified={props.modified}
                    editable={props.editable}
                    onChange={(arg, map, reset, action) => {onChange(arg, map, reset, action)}}
                > 
                    {queryDetails(type, qp, vmap)}
                </ChildDetail>
            )
        }
    }

    const start = () => {
        return (
            <AddNewLink 
                type={''}
                query={{}}
                details={props.details}
                configs={props.configs}
                modified={props.modified}
                editable={props.editable}
                onChange={(arg, map) => {}}
                onAction={(arg, map, reset, action) => {
                    onChange(arg, map, reset, action);
                }}
            />
        )
    }

    const ui = (qp, valmap) => {
        let li = helpers.json.keys(qp);

        if(li && li.length > 0){
            return li.map((type, i) => {
                return (
                    <div className={holderCls(qp, valmap)} key={i}>
                        {details(type, helpers.json.val(qp, type, {}), valmap || [])}
                    </div>
                );
            })
        }else{
            return (
                <div className='full pd-tb30'>
                    <p className='full pd-b10'>Are starting from fres?</p>
                    {start()}
                </div>
            )
        }

        return <></>
    }

    return ui(query);
}

export default RuntimeQueryConfigWrapper;