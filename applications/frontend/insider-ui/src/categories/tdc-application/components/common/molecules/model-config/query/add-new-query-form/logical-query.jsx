import helpers from 'ui-helpers';
import React, {useEffect, useState} from 'react';
import QueryModes from 'aio-app-ui-tdc-application-atoms/model-query/query-modes';
import ConditionalOptions from 'aio-app-ui-tdc-application-atoms/model-query/conditional-options';
import ColumnQuery from 'aio-app-ui-tdc-application-molecules/model-config/query/add-new-query-form/column-query';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(10);
    const map = helpers.json.val(props, 'map', []);

    const [query, setQuery] = useState({});    

    const updateQuery = (arg, vmap) => {
        let vm = {
            or:true,
            and:true
        }
        let qp = {};
        let m = [...vmap];
        let dm = [...vmap];
        let last = dm.pop(-1);
        let v = helpers.json.val(arg, 'id');
        
            if((vm[last] && vm[v]) || ((v === 'query' && last === 'logical') || (v === 'logical' && last === 'query'))){
                dm.push(v);
                qp = helpers.json.set(qp, dm.join('.'), {});
            }else{
                m.push(v);
                qp = helpers.json.set(qp, m.join('.'), {});
            }
            
            setQuery(qp);
    }

    const onConditionalChange = (arg, vmap) => {
        updateQuery(arg, vmap)
    }

    const onModeChange = (arg, vmap) => {
        updateQuery(arg, vmap)
    }

    const cmap = (vm) => {
        let rv = [];
        let valm = [...vm];
        let ovm = helpers.json.val(props, 'map', []);
        let rval = helpers.string.replace.word(valm.join('.'), (`${ovm.join('.')}`), '');
            rval = rval.split('.');

            rval.map((i) => {
                if(i){
                    rv.push(i)
                }
            });
            
        return rv;
    }

    const onQueryAction = (qury, action, map) => {
        if(props.onAction){
            props.onAction(qury, action, map);
        }
    }

    const details = (vm, qp, view) => {
        const vmap = [...vm];

        switch(view) {
            case 'query':
                return (
                    <ColumnQuery
                        map={vmap}
                        type={view}
                        queryData={qp}
                        details={props.details}
                        configs={props.configs}
                        modified={props.modified}
                        editable={props.editable}
                        onAction={(qury, action, map) => {
                            onQueryAction(qury, action, map);
                        }}
                        //onChange={(arg) => {onChange(arg, vmap, true)}}
                    />
                )
            break;
            case 'logical':
                return (
                    <ConditionalOptions
                        query={qp}
                        map={cmap(vmap)}
                        details={props.details}
                        configs={props.configs}
                        modified={props.modified}
                        editable={props.editable}
                        onChange={(arg) => {
                            onConditionalChange(arg, [...vmap]);
                        }}
                    />
                )
            break;
            case 'or':
            case 'and':
                return (
                    <QueryModes
                        query={qp}
                        map={cmap(vmap)}
                        details={props.details}
                        configs={props.configs}
                        modified={props.modified}
                        editable={props.editable}
                        onChange={(arg) => {
                            onModeChange(arg, [...vmap]);
                        }}
                    />
                )
            break;
            default:
                return (
                    <QueryModes
                        query={qp}
                        map={cmap(vmap)}
                        details={props.details}
                        configs={props.configs}
                        modified={props.modified}
                        editable={props.editable}
                        onChange={(arg) => {
                            onModeChange(arg, [...vmap]);
                        }}
                    />
                )
        }
    }

    const ui = (vm) => {
        let qp = helpers.json.val(query, vm.join('.'));

        if(qp){
            const li = helpers.json.keys(qp);

            if(li && li.length > 0){
                return li.map((item, i) => {
                    const valmap = [...vm, item];
                    if(item === 'query'){
                        return (
                            <div className='full' key={id+i}>
                                {details([...valmap], {}, vm.pop(-1))}
                                <div className='full pd-t20'>
                                    {details([...valmap], helpers.json.val(qp, item, {}), item)}
                                </div>
                            </div>
                        )
                    }else{
                        return (
                            <div className='full' key={id+i}>
                                {details([...valmap], {}, vm.pop(-1))}
                                <div className='full pd-t20'>
                                    {ui([...valmap])}
                                </div>
                            </div>
                        )
                    }
                });
            }else{
                return details([...vm], {}, vm.pop(-1));
            }
        }else{
            return details([...vm], {}, vm.pop(-1));
        }
    }

    return (
        <>
            <p className="txt-xxs full pd-b20">{map.join('.')}</p>
            {ui([...map])}
        </>
    )
}

export default Comp;