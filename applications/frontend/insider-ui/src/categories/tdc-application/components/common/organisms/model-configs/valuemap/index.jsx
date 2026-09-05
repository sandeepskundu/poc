import helpers from 'ui-helpers';
import DataValueMap from 'aio-app-ui-tdc-application-molecules/data-value-map';
import SchemaValuemap from 'aio-app-ui-tdc-application-molecules/model-schema-valuemap';
import AddNewHashLink from 'aio-app-ui-tdc-application-molecules/model-config/md5-hash/add-new-hash';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(16);
    const parentId = helpers.json.val(props, 'parentId', '');
    const active = helpers.json.val(props, 'expend.model', '');
    const valuemaps = helpers.json.val(props, 'details.model.valuemap', {});

    const isexpended = (map) => {
        return (active.indexOf(`${parentId}.${map}`) === 0);
    }

    const toggle = (node) => {
        if(props.onExpend){
            if(isexpended(node)){
                props.onExpend(parentId);
            }else{
                props.onExpend(`${parentId}.${node}`);
            }
        }
    }

    const remove = (name) => {
        let d = helpers.json.copy(valuemaps);
            delete d[name];

            if(props.onChange){
                props.onChange(d, 'model-valuemap')
            }
    }

    const header = (node) => {
        return (
            <div className='full bxs pd-tb10'>
                <div className='full bxs flx-sb'>
                    <ul className='bxs flx-vc flx-sb'>
                        <li className='pd-r10 txt-sm'>{node}</li>
                    </ul>
                    <ul className='bxs flx-vc'>
                        <AddNewHashLink 
                            modified={{
                                details:valuemaps
                            }}
                            onChange={onAdd}
                            configs={props.configs}
                            details={props.details}
                        />
                        <li className='pd-l10 cp txt-xs link-u ns'><span onClick={() => remove(node)}>Remove</span></li>
                        <li className='pd-l10 cp txt-xs link-u ns'><span onClick={() => toggle(node)}>{isexpended(node)?'Collapse':'Expend'}</span></li>
                    </ul>
                </div>
            </div>
        )
    }

    const onChange = (arg, name) => {
        let d = helpers.json.copy(valuemaps);
            d[name] = d[name] || {};
            d[name].valuemap = arg;

            if(props.onChange){
                props.onChange(d, 'model-valuemap')
            }
    }

    const onSchemaChange = (arg, map, name, oldData) => {
        const vm = map.join('.');

        if(valuemaps[vm]){

        }else{
            let d = helpers.json.copy(valuemaps);
                d[vm] = oldData;

                if(name){
                    delete d[name];
                }

                if(props.onChange){
                    props.onChange(d, 'model-valuemap')
                }
        }
        toggle(vm);
    };

    const onAdd = (arg, map) => {
        onSchemaChange({}, map, false, {
            valuemap:{
                map:"",
                from:"",
                fallback:{
                    map:"",
                    from:""
                }
            }
        });
    }

    const details = (data, name) => {
        let exp = isexpended(name);

            if(exp){
                return (
                    <div className='full bxs pd-b20'>
                        <div className='full bxs pd-b16'>
                            <SchemaValuemap
                                modified={{}}
                                mapping={name}
                                configs={props.configs}
                                details={props.details}
                                onChange={(arg, map) => {onSchemaChange(arg, map, name, data)}}
                            />
                        </div>
                        <DataValueMap
                            valueMapNode='valuemap'
                            details={props.details}
                            configs={props.configs}
                            valMapDetails={data.valuemap}
                            onChange={(arg) => {onChange(arg, name)}}
                        />
                    </div>
                )
            }else{
                return <></>
            }
    }

    const childWrapperCls = (i) => {
        let rval = ['full bdr-c00104 bdr-1 bdr-wrln bdr-wbn pd-rl10 bxs']
        let odd = helpers.is.odd(i);

        if(odd){
            rval.push('bg-c00101');
        };

        return rval.join(' ');
    }

    const addNewLink = (id) => {
        return (
            <p className='full bxs txt-sm'>Column valuemap is not added till now, <label className="link-u ns cp link-u ns" htmlFor={id}>click here</label> to start adding.</p>
        )
    }

    const childs = () => {
        const li = helpers.json.keys(valuemaps);

        if(li && li.length > 0){
            return li.map((name, i) => {
                return (
                    <div className={childWrapperCls(i)} key={id+i}>
                        {header(name)}
                        {details((valuemaps[name] || {}), name)}
                    </div>
                )
            })
        }else{
            return (
                <div className='full bxs pd-tb16'>
                    <AddNewHashLink 
                        modified={{
                            details:valuemaps
                        }}
                        onChange={onAdd}
                        label={addNewLink}
                        configs={props.configs}
                        details={props.details}
                    />
                </div>
            )
        }
    }

    const ui = () => {
        return (
            <div className='full bxs pd-rl10'>
                {childs()}
            </div>
        )
    }

    return ui();
}


export default Comp;