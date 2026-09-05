import Md5Child from './child';
import helpers from 'ui-helpers';
import SchemaValuemap from 'aio-app-ui-tdc-application-molecules/model-schema-valuemap';
import AddNewHashLink from 'aio-app-ui-tdc-application-molecules/model-config/md5-hash/add-new-hash';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(16);
    const parentId = helpers.json.val(props, 'parentId', '');
    const active = helpers.json.val(props, 'expend.model', '');
    const md5Hash = helpers.json.val(props, 'details.model.md5Hash', {});

    const isexpended = (map) => {
        return (active.indexOf(`${parentId}.${map}`) === 0);
    }

    const onChangeCallback = (arg) => {
        if(props.onChange){
            props.onChange(arg, 'md5Hash')
        }
    }

    const toggle = (map) => {
        let exp = isexpended(map);
        if(props.onExpend){
            if(exp){
                props.onExpend(parentId)
            }else{
                props.onExpend(`${parentId}.${map}`)
            }
        }   
    }

    const doToggle = (map) => {
        if(props.onExpend){
            props.onExpend(`${parentId}.${map}`)
        }
    }

    const onChange = (arg,  map, type) => {
        let d = helpers.json.copy(md5Hash)
            d = helpers.json.merge(d, (arg || {}));
            onChangeCallback(d);
            doToggle(map.join('.'))
    }

    const onRemove = (map) => {
        let d = helpers.json.copy(md5Hash);
            delete d[map];
            onChangeCallback(d)
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
                            modified={md5Hash}
                            onChange={onChange}
                            configs={props.configs}
                            details={props.details}
                        />
                        <li className='pd-l10 cp txt-xs link-u ns'><span onClick={() => onRemove(node)}>Remove</span></li>
                        <li className='pd-l10 cp txt-xs link-u ns'><span onClick={() => toggle(node)}>{isexpended(node)?'Collapse':'Expend'}</span></li>
                    </ul>
                </div>
            </div>
        )
    }

    const details = (map) => {
        const exp = isexpended(map);

        if(exp){
            return (
                <>
                    <SchemaValuemap
                        {...props}
                        mapping={map}
                        modified={md5Hash}
                        onChange={onChange}
                        configs={props.configs}
                        details={props.details}
                    />
                    <Md5Child
                        {...props}
                        mapping={map}
                        modified={md5Hash}
                        onChange={onChange}
                        configs={props.configs}
                        details={props.details}
                    />
                </>
            )
        }else{
            return <></>
        }
    }

    const childWrapperCls = (i) => {
        let rval = ['full bdr-c00104 bdr-1 bdr-wrln bdr-wbn pd-rl10 bxs']
        let odd = helpers.is.odd(i);

        if(odd){
            rval.push('bg-c00102');
        };

        return rval.join(' ');
    }

    const addNewLink = (id) => {
        return (
            <p className='full bxs txt-sm'>Md5Hash is not added till now, <label className="link-u ns cp link-u ns" htmlFor={id}>click here</label> to start adding.</p>
        )
    }

    const childs = () => {
        const li = helpers.json.keys(md5Hash);

        if(li && li.length > 0){
            return li.map((name, i) => {
                return (
                    <div className={childWrapperCls(i)} key={id+i}>
                        {header(name)}
                        {details(name)}
                    </div>
                )
            })
        }else{
            return (
                <div className='full bxs pd-t16'>
                    <AddNewHashLink
                        modified={md5Hash}
                        label={addNewLink}
                        onChange={onChange}
                        configs={props.configs}
                        details={props.details}
                    />
                </div>
            )
        }
    }

    const ui = () => {
        return (
            <div className='full bxs pd-rl12 pd-b16'>
                {childs()}
            </div>
        )
    }

    return ui();
}

export default Comp;