import helpers from 'ui-helpers';
import DsValuemap from 'aio-app-ui-templates/design-system-valuemap';
import ComponentDesignSystemAddForm from 'aio-app-ui-tdc-ds-molecules/component-design-system-add-form';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const combinned = true;
    const id = helpers.random.id(10);
    const vmap = helpers.json.val(props, 'valuemap', []);
    const valmap = helpers.json.val(props, 'valuemap.self', []);
    const active = helpers.json.val(props, 'expended.child', '');
    const dview = helpers.json.val(props, 'valuemap.detailsview', []);
    const ptype = helpers.json.val(props, 'item.aioDsConfigs.type', 'string');

    const options = [
        {
            "id":"details",
            "label":"Prop configs"
        }, {
            "id":"childs",
            "label":"Prop childs"
        }
    ]

    const map = (arg, exp, type) => {
        let rv = [];
        let m = helpers.json.val(dview, 'childs', []);
        let l = m.length;
            m = [...m];

        for(const a in m){
            rv.push(m[a]);

            if(type){
                if(parseInt(a) === (l-1)){
                    rv.push(arg.id);
                }else{
                    rv.push(type); 
                }
            }else{
                rv.push(arg.id);
            }
        }

        if(exp){
            rv.pop();
        };

        return rv.join('.');
    }

    const type = (arg) => {
        return (arg.id === 'details'?'childs':(arg.id))
    }

    const toggle = (arg, exp) => {

        let t = type(arg);

        if(props.onExpend){
            props.onExpend(map(arg, exp, t), 'child');
        }
    }

    const expended = (arg) => {
        let t = type(arg);
        let m = map(arg, false, t);

        if(combinned){
            if(arg.id === 'childs'){
                return (active === m);
            }else{
                return false;
            }
        }else{
            if(arg.id === 'childs'){
                return (active && active.indexOf(m) === 0);
            }else{
                if(active){
                    return (active === m);
                }
            }
        }
    }

    const header = (arg) => {
        const exp = expended(arg);

        return (
            <div className='full bxs flx-sb pd-rl10'>
                <ul className='bxs flx-vc flx-sb'>
                    <li className='pd-r10 txt-xs'>
                        <p className='full bxs'>{arg.label}</p>
                    </li>
                </ul>
                <ul className='bxs flx-vc'>
                    <li className='pd-r10 cp txt-xxs link-u ns' onClick={() => {toggle(arg, exp)}}>{exp?'Collapse':'Expend'}</li>
                </ul>
            </div>
        )
    }

    const onValmapChange = (arg) => {
        let rv = [];
        let d = helpers.json.val(props, 'data', {});
        let vm = helpers.json.val(props, 'valuemap.self', []);

            for(const a in vm){
                rv.push(vm[a]);

                if(parseInt(a) === (vm.length-1)){
                    rv.push('aioDsConfigs')
                }else{
                    rv.push('aioDsChilds');
                }
            };

            d = helpers.json.copy(d);
        let vmap = `${rv.join('.')}`;
        let vmd = helpers.json.val(d, vmap, {});
            vmd.valuemap = arg;
            helpers.json.remove(d, vmap);
            d = helpers.json.set(d, vmap, vmd, false, false);

            if(props.onChange){
                props.onChange(d, false, false, false, `${vmap}.valuemap`);
            }
    }

    const valmapUi = () => {

        const cur = helpers.json.val(props, 'current', false);
        const exclude = {
            'jsx':false,
            'enum':false,
            'number':false,
            'string':false,
            'object':false,
            'boolean':false,
            'function':true,
            'design-system':true,
            'extended-design-system':true
        };

        if(cur && !exclude[ptype]){
            return (
                <div className='full bxs bg-c00102'>
                    <DsValuemap
                        data={{
                            body:{},
                            data:{},
                            query:{},
                            props:{},
                            params:{},
                        }}
                        onExpend={props.onExpend}
                        onChange={(arg) => {onValmapChange(arg)}}
                        active={helpers.json.val(props, 'expended.valuemap', '')}
                        valuemap={helpers.json.val(props, 'item.aioDsConfigs.valuemap')}
                        valuetype={helpers.json.val(props, 'item.aioDsConfigs.type', 'string')}
                    />
                </div>
            )
        }else{
            return <></>
        }
    }

    const getChild = () => {
        if(props.child){
            return (
                <>
                    {valmapUi()}  
                    {props.child({...vmap})}
                </>
            )
        }else{
            return <></>
        }
    }

    const details = (arg) => {
        const type = helpers.json.val(arg, 'id', '');

        switch (type) {
            case 'details':
                return (
                    <ComponentDesignSystemAddForm
                        {...props}
                        mode='update'
                    />
                )
            break;
            case 'childs':
                return getChild();
            break;
            default:
                return <></>
        }
    }

    const getDetails = (active) => {
        if(combinned){
            const cur = helpers.json.val(props, 'current', false)
            return (
                <>
                    {cur?(
                        <div className='full bxs bg-c00102 pd-8 pd-bn'>
                            <ComponentDesignSystemAddForm {...props} mode='update' />
                        </div>
                    ):<></>}
                    {getChild()}
                </>
            )
        }else{
            if(active){
                return (
                    <div className='full bxs'>
                        {details(arg)}
                    </div>
                )
            }
        }

        return <></>
    }

    const list = () => {
        return options.map((arg, i) => {
            const active = expended(arg);

            if(combinned){
                if(arg.id === 'childs'){
                    return (
                        <div className='full bxs anim pd-rl6' key={id+i}>
                            {getDetails(active)}
                        </div>
                    )
                }
            }else{
                return (
                    <div className='full bxs anim pd-rl6' key={id+i}>
                        <div className={`bdr-c00104 bdr-1 bdr-wrln bdr-wbn bxs full pd-tb4 hide`}>
                            {header(arg)}
                        </div>
                        {getDetails(active)}
                    </div>
                )
            };
        })
    }

    const ui = () => {

        if(1 === 2){
            return (
                <div className='full bxs anim pd-rl6 bg-c00101'>
                    <ComponentDesignSystemAddForm {...props} mode='update' />
                    {getChild()}
                </div>
            )
        }else{
            return list();
        }
        
    }

    return ui();
}

export default Comp 