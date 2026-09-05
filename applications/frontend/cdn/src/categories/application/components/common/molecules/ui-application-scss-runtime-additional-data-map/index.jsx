import helpers from 'ui-helpers';
import React, {useState} from 'react';
import AddNewLink from 'aio-app-ui-application-molecules/ui-application-add-scss-new-data-map';
import UiAppicationScssDataMap from 'aio-app-ui-application-atoms/ui-application-scss-data-map';


const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = 'additionalDataMap';
    const details = helpers.json.val(props, 'details', {});
    const aditional = helpers.json.val(details, map, {});
    const options = helpers.json.keys(aditional);
    const active = helpers.json.val(props, 'expended', '');

    const valmap = (name) => {
        let vlmap = [...props.valuemap];
            vlmap.push(map);
            vlmap.push(name);

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

    const expended = (name) => {
        return (active === valmap(name))
    }

    const addNew = () => {
        return (
            <AddNewLink
                map={map}
                data={aditional}
                onAction={onAction}
                details={props.details}
                configs={props.configs}
            />
        )
    }

    const header = (name) => {
        const exp = expended(name);

        return (
            <div className='full bxs flx-sb'>
                <ul className='bxs flx-vc flx-sb'>
                    <li className='pd-r10 txt-sm'>{name}</li>
                </ul>
                <ul className='bxs flx-vc'>
                    {addNew()}
                    <li className='pd-r10 cp txt-xs link-u ns' onClick={() => {toggle(name, exp)}}>{exp?'Collapse':'Expend'}</li>
                </ul>
            </div>
        )
    }

    const onAction = (data, name) => {
        onChange(data);
        setTimeout(() => {toggle(name, false)}, 10);
    }

    const onChange = (data) => {
        let d = helpers.json.copy(details);
            d.additionalDataMap = data;
        
            if(props.onChange){
                props.onChange(d);
            }
    }

    const detailsUi = (name) => {
        const exp = expended(name);

        if(exp){
            return (
                <UiAppicationScssDataMap 
                    name={name}
                    data={aditional}
                    onChange={onChange}
                    configs={props.configs}
                    details={props.details}
                />
            )
        }else{
            return <></>
        }
    }

    const list = () => {
        return options.map((name, i) => {
            return (
                <div className='full bxs pd-rl14' key={name+i}>
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
                <p className='full bxs pd-rl14 pd-tb12 txt-sm fm-md'>Run time scss additional variables</p>
                {list()}
            </div>
        )
    }

    return ui();
}

export default Comp;