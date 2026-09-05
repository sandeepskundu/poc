import helpers from 'ui-helpers';
import React, {useEffect, useState, useRef} from 'react';
import DataValueMap from 'aio-app-ui-tdc-application-molecules/data-value-map';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(16);
    const mapping = helpers.json.val(props, 'mapping', '');
    const details = helpers.json.val(props, 'modified', {});
    const parentId = helpers.json.val(props, 'parentId', '');
    const active = helpers.json.val(props, 'expend.model', '');

    const isexpended = (map, type) => {
        return (active.indexOf(`${parentId}.${mapping}.${map}`) === 0);
    }

    const toggle = (map) => {
        const m = `${mapping}.${map}`;
        const cur = isexpended(map);
        if(props.onExpend){
            if(cur){
                props.onExpend(`${parentId}.${mapping}`);
            }else{
                props.onExpend(`${parentId}.${m}`);
            }
        }
    }

    const onChange = (arg, map) => {
        let d = helpers.json.copy(details);
            d[mapping] = d[mapping] || {};
            d[mapping].nodes = d[mapping].nodes || {};
            d[mapping].nodes[map] = arg;
        
            if(props.onChange){
                props.onChange(d);
            }
    }

    const onRemove = (map) => {
        let rval = {};
        let count = 0;
        let d = helpers.json.copy(details);
            d[mapping] = d[mapping] || {};
            d[mapping].nodes = d[mapping].nodes || {};
            delete d[mapping].nodes[map];

            rval[mapping] = {nodes:{}}

            for(const a in d[mapping].nodes){
                rval[mapping].nodes[count] = d[mapping].nodes[a];
                count = count+1;
            }
        
            if(props.onChange){
                props.onChange(rval, [mapping, map]);
            }
    }

    const dataValueMapCls = (i) => {
        let rval = ['full bdr-c00104 bdr-1 bdr-wrln bdr-wbn pd-rl10 bxs']
        let odd = helpers.is.odd(i);

        if(odd){
            rval.push('bg-c00103');
        }else{
            //rval.push('bg-c00104');
        }

        return rval.join(' ');
    }

    const detailUi = (d, name) => {
        const expended = isexpended(name);
        if(expended){
            return (
                <div className='full bxs pd-b20'>
                    <DataValueMap
                        valMapDetails={d}
                        valueMapNode='nodes'
                        details={props.details}
                        configs={props.configs}
                        onChange={(arg) => {onChange(arg, name)}}
                    />
                </div>
            )
        }else{
            return <></>
        }
    }

    const header = (d, node) => {
        return (
            <div className='full bxs pd-tb10'>
                <div className='full bxs flx-sb'>
                    <ul className='bxs flx-vc flx-sb'>
                        <li className='pd-r10 txt-sm'>{node}</li>
                    </ul>
                    <ul className='bxs flx-vc'>
                        <li className='pd-l10 cp txt-xs link-u ns'><span onClick={() => addNew()}>+ Add sibling</span></li>
                        <li className='pd-l10 cp txt-xs link-u ns'><span onClick={() => onRemove(node)}>{'Remove'}</span></li>
                        <li className='pd-l10 cp txt-xs link-u ns'><span onClick={() => toggle(node)}>{isexpended(node)?'Collapse':'Expend'}</span></li>
                    </ul>
                </div>
            </div>
        )
    }

    const addNew = () => {
        let nodes = helpers.json.val(details[mapping], `nodes`, {});
        let nodeIndex = helpers.json.length(nodes);
        let map = mapping.split('.')
        let d = helpers.json.copy(details);
            d[mapping] = d[mapping] || {};
            d[mapping].nodes = d[mapping].nodes || {};
            d[mapping].nodes[nodeIndex] = {
                map:"",
                from:"",
                fallback:{
                    map: '', 
                    from: 'env'
                }
            }

            map.push('nodes');
            map.push(nodeIndex);

            if(props.onChange){
                props.onChange(d, [mapping, nodeIndex]);
            }
    }


    const nodes = (map) => {
        const nodes = helpers.json.val(details[mapping], `nodes`, {});
        const nodesl = helpers.json.keys(nodes);

        if(nodesl && nodesl.length > 0){
            return nodesl.map((name, i) => {
                const d = helpers.json.val(nodes, name);
                return (
                    <div className={dataValueMapCls(i)} key={id+i+'s'}>
                        {header(d, name)}
                        {detailUi(d, name)}
                    </div>
                )
            })
        }else{
            return (
                <p className='full bxs txt-sm'>Child is not added till now, <label className="link-u ns cp link-u ns" onClick={() => {addNew()}}>click here</label> to start adding.</p>
            )
        }
    }

    const title = () => {
        return <p className='full bxs pd-r10 txt-sm fm-md pd-b10'>Childs</p>
    }

    const ui = () => {
        return (
            <>
                {title()}
                {nodes()}
            </>
        )
    }

    return ui();
}


export default Comp;