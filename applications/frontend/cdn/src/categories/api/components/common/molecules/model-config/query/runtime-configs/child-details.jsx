import helpers from 'ui-helpers';
import AddNewLink from './add-new-link';
import mhelpers from 'aio-app-ui-api-modules';
import React, {useEffect, useState, useRef} from 'react';
import QueryDetailsView from 'aio-app-ui-api-molecules/model-config/query/details-view';
import QueryDetailsInputs from 'aio-app-ui-api-molecules/model-config/query/details-inputs';

const QueryChildDetails = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const [map, setMap] = useState(false);
    const [edit, setEdit] = useState(false);

    const canexpend = (self) => {
        let vm = helpers.json.val(props, 'mapping', []);
        let ac = helpers.json.val(props, 'actions.expended');
            vm = vm.join('.');

        if(self){
            return (ac === vm);   
        }

        return (ac && vm && ac.indexOf(vm) === 0);
    }
    const expend = canexpend();
    
    const maping = (type, qp, valmap) => {
        if(map && valmap && valmap.length > 0){
            return <p className='txt-xxs'>{valmap.join('.')}</p>
        }

        return <></>
    }

    const toggleExpend = () => {
        if(props.onAction){
            let vm = helpers.json.val(props, 'mapping', []);
            if(expend){
                vm.pop();
                props.onAction(vm.join('.'), 'expended')
            }else{
                props.onAction(vm.join('.'), 'expended')
            }
        }
    }

    const editAction = (type, qp, valmap) => {
        if(expend && !props.children){
            return <li className='pd-l12 cp txt-xs link-u ns hide' onClick={() => {setEdit(!edit)}}>{edit?'Details':'Edit'}</li>
        }
    }

    const canadd = (type, qp, valmap) => {
        let vm = {
            'or':true,
            'and':true,
            'query':true,
            'logical':true
        }

        switch(type) {
            case 'query':
                return true;
            break;
            case 'logical':
                return !(type === 'logical' && qp && qp.and && qp.or)
            break;
            case 'or':
            case 'and':
                return !(qp && qp.logical && qp.query)
            break;
            default:
              return vm[type];
        }
    }

    const delAction = (type, qp, valmap) => {
        const ca = canadd(type, qp, valmap);
        const ac = helpers.json.val(props, 'actions.expended');

        //if(ca && ac === valmap.join('.')){
        if(ca || !ca){
            return <li className='pd-l12 cp txt-xs link-u ns' onClick={() => {
                onChange(false, valmap, true, 'delete');
            }}>Delete</li>
        }
    }

    const onChange = (val, map, reset, action) => {
        if(props.onChange){
            props.onChange(val, map, reset, action);
        }
    }

    const addLink = (type, qp, valmap) => {
        const ca = canadd(type, qp, valmap);
        const ac = helpers.json.val(props, 'actions.expended');

        //if(ca && ac === valmap.join('.')){
        if(ca){
            return (
                <AddNewLink 
                    query={qp}
                    type={type}
                    map={valmap}
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
    }

    const header = (type, qp, valmap) => {
        return (
            <div className='full bxs pd-t10'>
                {maping(type, qp, valmap)}
                <div className='full bxs flx-sb pd-b10'>
                    <ul className='bxs flx-vc flx-sb'>
                        <li className='pd-r10 txt-sm'>{type}</li>
                    </ul>
                    <ul className='bxs flx-vc'>
                        {addLink(type, qp, valmap)}
                        <li className='pd-l12 cp txt-xs link-u ns' onClick={() => {setMap(!map)}}>{map?'Hide map':'View Map'}</li>
                        <li className='pd-l12 cp txt-xs link-u ns' onClick={() => {toggleExpend()}}>{expend?'Collapse':'Expend'}</li>
                        {editAction(type, qp, valmap)}
                        {delAction(type, qp, valmap)}
                    </ul>
                </div>
            </div>
        )
    }

    const child = (type, qury, valmap) => {
        if(expend){
            if(props.children){
                return props.children;
            }else{
                if(edit){
                    return (
                        <QueryDetailsInputs
                            map={valmap}
                            query={qury}
                            details={props.details}
                            configs={props.configs}
                            modified={props.modified}
                            editable={props.editable}
                            onAction={() => {}}
                            onChange={(arg, map) => {onChange(arg, map, true)}}
                        />
                    )
                }else{
                    return (
                        <QueryDetailsView 
                            map={valmap}
                            query={qury}
                            details={props.details}
                            configs={props.configs}
                            modified={props.modified}
                            editable={props.editable}
                            onAction={() => {}}
                            onChange={(arg, map) => {onChange(arg, map, true)}}
                        />
                    )
                }
            }
        }else{
            return <></>
        }
    }

    const details = (type, qp, valmap) => {
        return (
            <div className="full bxs">
                {header(type, qp, valmap)}
                {child(type, qp, valmap)}
            </div>
        )
    }

    const ui = (type, qp, valmap) => {
        return details(type, qp, valmap);
    }

    return ui(props.type, props.query, props.mapping);
}

export default QueryChildDetails;