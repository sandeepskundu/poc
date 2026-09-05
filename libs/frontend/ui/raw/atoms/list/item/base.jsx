import helpers from 'ui-helpers';
import {useRef, forwardRef} from "react";
import Row from 'aio-global-raw-ui/atoms/content-row';

const Comp = forwardRef((dprops, pref) => {
    const ref = pref || useRef(null);
    const rId = `rId${helpers.random.id(24)}`;
    const childs = ['start', 'before', 'center', 'after', 'end', 'after'];
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);   
     
    const data = helpers.json.get(props, 'data', {});
    const cbs = helpers.json.get(props, 'callbacks', {});
    const state = helpers.json.get(props, 'state', 'default');
    const disabled = helpers.json.get(props, 'disabled', false);

    const label = (() => {
        let k = helpers.json.get(props, 'kies.label', label);
        let rv = helpers.json.get(props, `data.${k}`, rId);
        return (rv != rId)?rv:''
    })();

    const getTheme = () => {
        let rval = {};
        let li = [...childs, 'wrapper'];
    
        for(let a in li){
            let t = li[a];
            let map = `config.${t}.ds`;
            let dt = helpers.json.get(props, `theme.default.${t}`, {});
            let st = helpers.json.get(props, `theme.${state}.${t}`, {});

            if(disabled){
                st = helpers.json.merge(st, helpers.json.get(props, `theme.disabled.${t}`, {}))
            }

            rval = helpers.json.set(rval, `config.${t}.ds`, helpers.json.merge(dt, st))
        }

        return rval;
    }

    const child = (arg, name) => {
        const Ch = helpers.json.get(props, `childs.${name}`, rId);

        if(Ch != '' && Ch != rId){
            let fun = helpers.data.type.is(Ch, 'function');
            if(fun){
                return Ch(props);
            }else{
                let isJsx = helpers.data.type.is(Ch, 'jsx');
                if(isJsx){
                    return React.createElement(React.Fragment, props, React.cloneElement(Ch, props));
                }else{
                    return `${Ch}`;
                }
            }
        }else{
            if(name === 'center' && label){
                return label;
            }
        }
    }

    const getChild = () => {
        const rv = {};

        for(let a in childs){
            const cn = childs[a]; 
            const c = helpers.json.get(props, `childs.${cn}`, rId);
            const fun = (arg) => { return child(arg, cn) }

            if(c != '' && c != rId){
                rv[cn] = fun;
            }else{
                if(cn === 'center' && label){
                    rv[cn] = fun;
                }
            }
        }

        return rv;
    }

    const onClick = (cb) => {
        switch (state) {
            case 'selected':
                cb(data, 'default', state, props) // argurment => data, new state, prev state, prop || => DON'T REMOVE THIS
            break;
            case 'disabled':
                cb(data, 'disable', state, props);
            break;
            default:
                cb(data, 'selected', state, props)
        }
    }


    const incb = (e, elm, cbname) => {
        if(cbname && elm && cbs[elm] && cbs[elm][cbname] && helpers.data.type.is(cbs[elm][cbname], 'function')){
            if(cbname === 'onClick' || cbname === 'onclick'){
                onClick(cbs[elm][cbname])
            }else{
                cbs[elm][cbname](data, state, state, props); // argurment => data, new state, prev state, prop || => DON'T REMOVE THIS
            }
        }
    }

    const getCallbacks = () => {
        const rv = {};

        for(let a in cbs){
            if(cbs[a]){
                for(let b in cbs[a]){
                    if(helpers.data.type.is(cbs[a][b], 'function')){
                        rv[a] = rv[a] || {};
                        rv[a][b] = (e) => { incb(e, a, b)};
                    }
                }
            }
        }

        return rv;
    }

    const getProps = (() => {
        return helpers.json.merge({
            childs:getChild(),
            callbacks:getCallbacks(),
            config:helpers.json.get(props, 'config', {})
        }, getTheme());
    })();

    return <Row {...getProps} />
});

export default Comp;