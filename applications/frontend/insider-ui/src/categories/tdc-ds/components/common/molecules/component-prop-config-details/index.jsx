import helpers from 'ui-helpers';
import ComponentPropsDetailsView from 'aio-app-ui-tdc-ds-organisms/component-props-detals-view';
import ComponentDesignJsxComponent from 'aio-app-ui-tdc-ds-molecules/component-props-jsx-component';
import ComponentDesignSystemConfig from 'aio-app-ui-tdc-ds-molecules/component-design-system-config';
import ComponentDesignSystemAddDrawer from 'aio-app-ui-tdc-ds-molecules/component-design-system-add-drawer';


const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const map = 'data.configs';
    const mapping = helpers.json.val(props, 'mapping', '');
    const active = helpers.json.val(props, 'expended.current', '');
    const configs = helpers.json.val(props, 'details.data.configs', {});

    const getExtMap = (arg, exp) => {
        let m = helpers.json.val(arg, 'self', []);

        if(exp){
            m.pop();
        };
        
        return `${mapping}.${m.join('.')}`;
    }

    const expended = (arg) => {
        let map = getExtMap(arg);
        return (active && active.indexOf(map) === 0)
    }

    const current = (arg) => {
        let map = getExtMap(arg);
        return (active && active === map)
    }

    const toggle = (arg, exp) => {
        let map = getExtMap(arg, exp);
        if(props.onExpend){
            props.onExpend(map);
        }
    }

    const remove = (vmap) => {
        if(props.onChange){
            let m = [];
            let d = helpers.json.copy(configs);
            let vm = helpers.json.val(vmap, 'self', []);

            for(const a in vm){
                m.push(vm[a]);
                if(parseInt(a) < (vm.length - 1)){
                    m.push('aioDsChilds')
                }
            };

            helpers.json.remove(d, m.join('.'));
            props.onChange(helpers.json.set({}, map, d), (arg) => {
                if(props.onExpend){
                    props.onExpend(`${getExtMap(vmap, true)}`, false, arg);
                }
            }, m);
        }
    }

    const removeLink = (item, vmap, name) => {
        return <li className='pd-l10 cp txt-xxs link-u ns' onClick={() => {remove(vmap)}}>Remove</li>
    }

    const onChange = (arg, node, vmap, exp, reset) => {
        let d = helpers.json.copy(configs);
        if(props.onChange){
            if(reset){
                helpers.json.remove(d, reset);
            };

            d = helpers.json.merge(d, arg);
            props.onChange(helpers.json.set({}, map, d), (arg) => {
                if(node){
                    let map = getExtMap(vmap, exp);
                    if(props.onExpend){
                        props.onExpend(`${map}.${node}`, false, arg);
                    }
                }
            }, reset);
        }
    }

    const addChild = (item, vmap, name, label) => {
        let type = helpers.json.val(item, 'aioDsConfigs.type');

        if(type === 'object'){
            return (
                <ComponentDesignSystemAddDrawer 
                    {...props}
                    item={item}
                    data={configs}
                    valuemap={vmap}
                    type='add-child'
                    labelText={label || "+ Add child"}
                    runtimeData={helpers.json.val(props, 'runtimeData', {})}
                    onChange={(arg, node) => {onChange(arg, node, vmap, false)}}
                />
            )
        }else{
            return <></>
        }
    }

    const addSibling = (item, vmap, name, isobj) => {
        if(isobj){
            return addChild(item, vmap, name, '+ Add Sibling')
        }else{
            return <></>
        }
    }

    const header = (item, vmap, name, pvmap, isobj) => {
        const cur = current(vmap);
        const exp = expended(vmap);

        return (
            <div className='full bxs flx-sb pd-rl10'>
                <ul className='bxs flx-vc flx-sb'>
                    <li className='pd-r10 txt-xs'>
                        <p className='full bxs'>{name}</p>
                        {cur?<p className='full bxs txt-xxs'>{helpers.json.val(vmap, 'self', []).join('.')}</p>:<></>}
                    </li>
                </ul>
                <ul className='bxs flx-vc'>
                    {addSibling(item, {...pvmap}, name, isobj)}
                    {addChild(item, vmap, name)}
                    {removeLink(item, vmap, name)}
                    <li className='pd-l10 cp txt-xxs link-u ns' onClick={() => {toggle(vmap, exp)}}>{exp?'Collapse':'Expend'}</li>
                </ul>
            </div>
        )
    }

    const onPropsChange = (arg, vmap) => {
        if(props.onChange){
            let m = [];
            let d = helpers.json.copy(configs);
            let vm = helpers.json.val(vmap, 'self', []);

            for(const a in vm){
                m.push(vm[a]);
                if(parseInt(a) < (vm.length - 1)){
                    m.push('aioDsChilds')
                }

                if(parseInt(a) === (vm.length - 1)){
                    m.push('aioDsConfigs');
                    m.push('props');
                }
            };

            helpers.json.remove(d, m.join('.'));
            d = helpers.json.set(d, m.join('.'), arg);
            props.onChange(helpers.json.set({}, map, d), false, m);
        }
    }

    const onDsAttrsExpend = (map, vmap) => {
        if(props.onExpend){
            props.onExpend(map, 'attrs');
        }
    }

    const parse = (item, vmap, name) => {
        let type = helpers.json.val(item, 'aioDsConfigs.type', '');

        switch (type) { 
            case 'jsx':
                return (
                    <div className='full bxs bg-c00103'>
                        <ComponentDesignJsxComponent 
                            {...props}
                            item={item}
                            data={configs}
                            valuemap={vmap}
                            onChange={onChange}
                            runtimeData={helpers.json.val(props, 'runtimeData', {})}
                        />
                    </div>
                )
            break;
            case 'enum':
                return <></>
            break;
            case 'string':
                return (
                    <></>
                )
            break;
            case 'number':
                return <></>
            break;
            case 'object':
                return compile({...vmap}, helpers.json.val(item, 'aioDsChilds', {}), true);
            break;
            case 'boolean':
                return <></>
            break;
            case 'function':
                return <></>
            break;
            case 'design-system':
                return (
                    <div className='full bxs bg-c00103'>
                        <ComponentDesignSystemConfig 
                            {...props}
                            item={item}
                            data={configs}
                            valuemap={vmap}
                            expended={props.expended}
                            onChange={(arg) => {onPropsChange(arg, vmap)}}
                            onAttrsExpend={(map) => {onDsAttrsExpend(map, vmap)}}
                            runtimeData={helpers.json.val(props, 'runtimeData', {})}
                        />
                    </div>
                )
            break;
            case 'extended-design-system':
                return <>extended-design-system</>
            break;
            default:
                return <></>
        }
    }

    const detailsUi = (item, vmap, name) => {
        const cur = expended(vmap);

        if(cur){
            return (
                <div className={`full bxs ${cur?'_bg-c00106':''}`}>
                    <ComponentPropsDetailsView 
                        {...props}
                        item={item}
                        data={configs}
                        valuemap={vmap}
                        onChange={onChange}
                        current={current(vmap)}
                        child={(vms) => {return parse(item, vms, name)}}
                        runtimeData={helpers.json.val(props, 'runtimeData', {})}
                    />
                </div>
            )
        }else{
            return <></>
        }
    }

    const compile = (vmap, arg, isobj) => {
        const list = helpers.json.keys(arg);
        const selfvm = helpers.json.val(vmap, 'self', []);
        const childsvm = helpers.json.val(vmap, 'childs', []);
        const configsvm = helpers.json.val(vmap, 'configs', []);
        const dchils = helpers.json.val(vmap, 'detailsview.childs', []);
        const ddetails = helpers.json.val(vmap, 'detailsview.details', []);

        return list.map((name, i) => {
            const vm = {
                self:[...selfvm, name],
                childs:[...childsvm, name, 'aioDsChilds'],
                configs:[...configsvm, name, 'aioDsConfigs'],
                detailsview:{
                    childs:[...dchils, name],
                    details:[...ddetails, name, 'details']
                }
            };
            const cur = current(vm);

            return (
                <div className={`full bxs bdr-c00104 bdr-1 bdr-wrln bdr-wbn`} key={helpers.random.id(10)}>
                    <div className={`full bxs pd-tb6 hbg-c00102 anim ${cur?'bg-c00102':''}`}>
                        {header(helpers.json.val(arg, name), vm, name, vmap, isobj)}
                    </div>
                    {detailsUi(helpers.json.val(arg, name), vm, name)}
                </div>
            )
        })
    }

    const letsStart = (id) => {
        return <label className="link-u ns cp txt-xxs fl" htmlFor={id}>Start</label>
    }

    const ui = (arg, isobj) => {
        const cl = helpers.json.length(arg);

        if(cl > 0){
            return compile({
                self:[],
                childs:[],
                configs:[],
                detailsview:{
                    childs:[],
                    details:[]
                }
            }, arg, isobj);
        }else{
            const vmap = {
                self:[],
                childs:[],
                configs:[],
                detailsview:{
                    childs:[],
                    details:[]
                }
            };

            return (
                <div className='full bxs pd-b12 pd-t6 pd-l12'>
                    <p className='txt-sm fm-md'>Wants to add component props?</p>
                    <p className='full txt-xs mr-tb4'>Lets start from beginning.</p>
                    <ComponentDesignSystemAddDrawer 
                        {...props}
                        item={{}}
                        data={configs}
                        valuemap={vmap}
                        type='add-child'
                        label={letsStart}
                        runtimeData={helpers.json.val(props, 'runtimeData', {})}
                        onChange={(arg, node) => {onChange(arg, node, vmap, false)}}
                    />
                </div>
            )
        }
    }

    return (
        <div className='full bxs pd-rl10'>
            {ui(configs, true)}
        </div>
    )
};

export default Comp;