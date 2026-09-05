import helpers from 'ui-helpers';
import React, {useState} from 'react';
import ParentChildMap from 'aio-app-ui-organisms/parent-child-map';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    const details = helpers.json.copy(props.details || {});
    const pId = helpers.json.val(props, 'parent.id');
    const prefix = helpers.json.val(props, 'parent.prefix', '');
    const hooks = helpers.json.val(details, `hooks.${pId}`, {});
    const hooksNames = helpers.json.val(details, `hooksKeyNames`, {});
    const hooksLabel = helpers.json.val(props, 'configs.hooksLables', {});
    const options = helpers.json.keys(hooksLabel);
    const active = helpers.json.val(props, 'expended', '');

    console.log(props);

    const key = (name) => {
        return `${prefix}${name}`;
    }

    const valmap = (name) => {
        let vlmap = [...props.valuemap];
            vlmap.push(key(name));

        return vlmap.join('.')
    }

    const toggle = (name, exp) => {
        if(props.onExpend){
            if(exp){
                props.onExpend('');
            }else{
                props.onExpend(valmap(name));
            }
        }
    }

    const onChange = (valmap, name) => {
        let hd = helpers.json.copy(hooks || {});
        let huks = helpers.json.val(details, 'hooks', {});
        let phuks = helpers.json.val(details, `hooks.${pId}`, {});
            hd[name] = valmap;
            phuks = helpers.json.merge(phuks, hd);
            huks[pId] = helpers.json.merge((huks[pId] || {}), phuks);
        
            if(props.onChange){
                props.onChange(huks, 'hooks', true);
            }
    }

    const expended = (name) => {
        return active === valmap(name);
    }

    const header = (name) => {
        const exp = expended(name);

        return (
            <div className='full bxs flx-sb'>
                <ul className='bxs flx-vc flx-sb'>
                    <li className='pd-r10 txt-sm'>{helpers.json.val(hooksLabel, name)}</li>
                </ul>
                <ul className='bxs flx-vc'>
                    <li className='pd-r10 cp txt-xs link-u ns' onClick={() => {toggle(name, exp)}}>{exp?'Collapse':'Expend'}</li>
                </ul>
            </div>
        )
    }

    const selected = (kmap) => {
        return helpers.json.val(hooks, kmap, '');
    }

    const detailsUi = (name) => {
        const exp = expended(name);

        if(exp){
            const kname = key(name);
            return (
                <ParentChildMap 
                    name={kname}
                    details={props.details}
                    configs={props.configs}
                    selected={selected(kname)}
                    onChange={(valmap) => {onChange(valmap, kname)}}
                    apiConfig={{
                        "rootId":'67e640d2601ba8c6b57114a2',
                        "url":{
                            root:"http://localhost:1300/cdn/gUtilsApi/siteprops/:_id_:",
                            child:'http://localhost:1300/cdn/gUtilsApi/siteprops/:_id_:'
                        },
                    }}
                />
            )
        }else{
            return <></>
        }
    }

    const list = () => {
        return options.map((name, i) => {
            return (
                <div className='full bxs pd-rl6' key={name+i}>
                    <div className='bdr-c00104 bdr-1 bdr-wrln bdr-wbn bxs full pd-tb8'>
                        {header(name)}
                    </div>
                    {detailsUi(name)}
                </div>
            )
        })
    }

    const ui = () => {
        return (
            <div className='full bxs'>
                {list()}
            </div>
        )
    }

    return ui();
}

export default Comp;