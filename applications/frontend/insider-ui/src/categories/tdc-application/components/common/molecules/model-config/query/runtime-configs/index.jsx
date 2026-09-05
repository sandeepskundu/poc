
import helpers from 'ui-helpers';
import React, {useState} from 'react';
import AddNewLink from './add-new-link';
import ChildDetail from './child-details';
import mhelpers from 'aio-app-ui-tdc-application-modules';

const RuntimeQueryConfigWrapper = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const query = helpers.json.val(props, 'query', {});

    const parentId = helpers.json.val(props, 'parentId', '');
    const active = helpers.json.val(props, 'expend.model', '');

    const isexpended = (map) => {
        return (active.indexOf(`${parentId}.${map}`) === 0);
    }

    const doToggle = (map) => {
        if(props.onExpend){
            props.onExpend(`${parentId}.${map}`)
        }
    }

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

        if(action === 'add-new'){
            if(map && map.length > 1){
                onAction(map.join('.'), 'expended');
            }else{
                onAction('query.0', 'expended');
            }
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
        if(props.onExpend){
            if(action === 'expended'){
                props.onExpend(`${parentId}.${val}`);
            }else{
                props.onExpend(parentId);
            }
        }
    }

    const queryDetails = (type, qp, valmap) => {
        let li = helpers.json.keys(qp);

        if(li && li.length > 0){
            return li.map((type, i) => {
                return (
                    <div className={holderCls(helpers.json.val(qp, type, {}), valmap)} key={i}>
                        <ChildDetail
                            {...props}
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
                    {...props}
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
                    {...props}
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

    const startLabel = (id) => {
        return <label className="link-u ns cp txt-xs link-u ns" htmlFor={id}>+ Add</label>
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
                label={(id) => {return startLabel(id)}}
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
                <div className='full bxs pd-rl20 pd-b12'>
                    <p className='txt-x fm-md'>Wants to add runtime query?</p>
                    <p className='full txt-xs mr-tb4'>Lets start from beginning.</p>
                    {start()}
                </div>
            )
        }
    }

    return ui(query);
}

export default RuntimeQueryConfigWrapper;