import {useState} from 'react';
import configs from './configs';
import helpers from 'ui-helpers';
import DesignSystemValuemapMapInputs from 'aio-app-ui-organisms/design-system-valuemap-map-inputs';
import DesignSystemValuemapDefaultInputs from 'aio-app-ui-molecules/design-system-valuemap-default-inputs';
import DesignSystemValuemapFallbackInputs from 'aio-app-ui-organisms/design-system-valuemap-falback-inputs';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const active = helpers.json.val(props, 'active', '');

    const datavalue = (() => {
        let rval = helpers.json.val(props, 'data', false);

        if(rval){
            return rval;
        }

        return {
            body:{},
            data:{},
            query:{},
            props:{},
            params:{},
        }
    })();

    const valuemap = (() => {
        let rval = helpers.json.val(props, 'valuemap', false);

        if(!rval){
            return {
                map:'',
                from:'',
                default:{},
                fallback:{}
            }
        }else{
            return rval;
        }
    })();

    const data = {
        blank:false,
        data:datavalue,
        configs:configs,
        details:valuemap
    };

    const list = (() => {
        return helpers.json.toList(helpers.json.val(data, 'configs.value.kies', {}));
    })();

    const getExtMap = (map, exp, item) => {
        if(exp){
            map.pop();
        }

        return map.join('.');
    }

    const expended = (arg, item) => {
        let map = getExtMap(arg, false, item);
        return (active && active.indexOf(map) === 0)
    }

    const toggle = (vmap, exp, item) => {
        onExpend(getExtMap(vmap, exp, item))
    }

    const onExpend = (map) => {
        if(props.onExpend){
            props.onExpend(map, 'valuemap')
        }
    }

    const header = (item, vmap, arg) => {
        const exp = expended(vmap, item);
        return (
            <div className='full bxs flx-sb pd-rl6 txt-xs'>
                <ul className='bxs flx-vc flx-sb'>
                    <li className='pd-r10'>
                        <p className='full'>{item.label}</p>
                        {exp?<p className='txt-xxs full'>{vmap.join('.')}</p>:<></>}
                    </li>
                </ul>
                <ul className='bxs flx-vc'>
                    <li className='pd-l10 cp link-u ns txt-xxs' onClick={() => {toggle(vmap, exp, item)}}>{exp?'Collapse':'Expend'}</li>
                </ul>
            </div>
        )
    }

    const onChange = (arg, valmap, type) => {
        let m = valmap.join('.');
        let dta = helpers.json.copy(data);
        let d = helpers.json.val(data, 'details', {});

        if(type === 'map'){
            let vm = [...valmap];

            if(valmap.length < 2){
                dta.details = helpers.json.merge(d, arg);
            }else{
                vm.splice(-1);
                m = vm.join('.');
                helpers.json.remove(d, m);
                dta.details = helpers.json.set(d, m, arg, false, false);
            }
        }else{
            helpers.json.remove(d, m);
            dta.details = helpers.json.set(d, m, arg, false, false);
        };

        if(props.onChange){
            props.onChange(helpers.json.val(dta, 'details', {}), active);
        }
    }

    const detailsui = (valuemap, details, type) => {
        const t = helpers.json.val(type, 'id', '');

        switch (t) {
            case 'map':
                return (
                    <DesignSystemValuemapMapInputs
                        {...props}
                        type={type}
                        details={details}
                        valuemap={valuemap}
                        onChange={(arg, valmap) => {onChange(arg, valuemap, valmap)}}
                    />
                )
            break;
            case 'default':
                return (
                    <DesignSystemValuemapDefaultInputs
                        {...props}
                        type={type}
                        details={details}
                        valuemap={valuemap}
                        valuetype={helpers.json.val(props, 'valuetype', 'string')}
                        onChange={(arg, valmap) => {onChange(arg, valuemap, valmap)}}
                    />
                )
            break;
            case 'fallback':
                return (
                    <DesignSystemValuemapFallbackInputs 
                        {...props}
                        type={type}
                        details={details}
                        valuemap={valuemap}
                        onExpend={onExpend}
                        onChange={(arg) => {onChange(arg, valuemap)}}
                        getChilds={(arg, valmap) => {return ui(arg, valmap)}}
                    />
                )
            break;
            case '':
            break;
            default:
                return <></>
        }
    }

    const details = (vmap, arg, item) => {
        let exp = expended(vmap, item);
        let fb = helpers.json.val(arg, 'fallback', {});
        let fbl = helpers.json.length(fb);

        if(exp){
            if(fbl > 0 && (item && item.id === 'fallback')){
                return (
                    <div className='full bxs pd-rl10'>
                        <div className='full'>
                            {detailsui(vmap, arg, item)}
                        </div>
                        {compile(fb, vmap)}
                    </div>
                )
            }else{
                return (
                    <div className='full bxs pd-rl10'>
                        <div className='full'>
                            {detailsui(vmap, arg, item)}
                        </div>
                    </div>
                )
            }
        }else{
            return <></>
        }
    }

    const shouldShow = (arg, valmap, item) => {
        let valNa = '__VALUE__NOT__DEFINED__';
        let id = helpers.json.val(item, 'id');
        let d = helpers.json.val(arg, id, valNa);

        if(id === 'default'){
            if(valmap.length > 0){
                let map = helpers.json.val(arg, 'map', valNa);
                let from = helpers.json.val(arg, 'from', valNa);
                return ((map && from) && (map != valNa) && (from != valNa));
            }else{
                return (d != valNa);
            }
        }else{
            if(id === 'map'){
                if(valmap.length > 0){
                    return true;
                }else{
                    let ddval = helpers.json.val(arg, 'default.value');
                    let dval = helpers.json.val(arg, 'default.value', valNa);
                    let valm = helpers.json.val(arg, 'default.valuemap', '');
                    let mapv = helpers.json.val(arg, 'default.valueFromMap', false);

                    return ((ddval != null && (dval != valNa)) || (valm && mapv && valm.indexOf('__LAST__ITEM__ENUM__') === -1))
                }
            }

            if(id === 'fallback'){
                let map = helpers.json.val(arg, 'map', valNa);
                let from = helpers.json.val(arg, 'from', valNa);
                return ((map && from) && (map != valNa) && (from != valNa));
            }
        }
    }

    const nested = (arg, valmap) => {
        return list.map((item, i) => {
            let vm = [...valmap];
            let id = helpers.json.val(item, 'id');

            if(shouldShow(arg, valmap, item)){
                vm.push(id);
                return (
                    <div className='full bxs pd-rl4'>
                        <div className={`full bxs bdr-c00104 pd-tb4 bdr-1 bdr-wrln bdr-wbn`}>
                            {header(item, vm, arg)}
                        </div>
                        {details(vm, arg, item)}
                    </div>
                )
            }else{
                return <></>
            } 
        });
    }

    const compile = (arg, valmap) => {
        const obj = {
            map:helpers.json.val(arg, 'map', ''),
            from:helpers.json.val(arg, 'from', ''),
            default:helpers.json.val(arg, 'default', {}),
            fallback:helpers.json.val(arg, 'fallback', {}),
            mapValueAtRuntime:helpers.json.val(arg, 'mapValueAtRuntime', false),
            valueNotMappedWithSelectedFromData:helpers.json.val(arg, 'valueNotMappedWithSelectedFromData', false)
        };

        if(obj){
            return nested(obj, valmap);
        }else{
            return <></>
        }
    }

    const ui = (arg, valmap) => {
        const cl = helpers.json.length(arg);

        if(cl > 0){
            return compile(arg, valmap);
        }else{
            return <></>
        }
    }

    return (
        <div className='full bxs'>
            {ui(data.details, [])}
        </div>
    )
};

export default Comp;