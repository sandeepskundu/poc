import helpers from 'ui-helpers';
import DsValuemap from 'aio-app-ui-templates/design-system-valuemap';
import HtmlAttributeAddDrawer from 'aio-app-ui-molecules/html-attribute-add-drawer'

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(10);
    const data = helpers.json.val(props, 'data', {});
    const expended = helpers.json.val(props, 'expended', '');
    const expendmap = helpers.json.val(props, 'expendmap', '');
    const list = helpers.json.keys(data);

    const getmap = (name) => {
        return `${expendmap}.${name}`;
    }

    const current = (name) => {
        if(expended && expended.indexOf(getmap(name)) === 0){
            return true;
        }else{
            return false;
        }
    }

    const toggle = (name) => {
        const cur = current(name);

        if(props.onExpend){
            if(cur){
                let m = expended.split('.');
                    m.pop();
                    props.onExpend(m.join('.'));
            }else{
                props.onExpend(getmap(name));
            }
        }
    }

    const startLabel = (id) => {
        return (
            <p className='full bxs'>
                <label className="link-u ns cp txt-xxs" htmlFor={id}>Start</label>
            </p>
        )
    }

    const addmore = (id) => {
        return (
            <p className='full bxs pd-rl16 pd-b4 bdr-c00104 bdr-1 bdr-wrln bdr-wbn ac bg-c00101'>
                <label className="link-u ns cp txt-xxs bxs" htmlFor={id}>+ Add more</label>
            </p>
        )
    }

    const onChange = (arg) => {
        let d = helpers.json.copy(data);
        let name = helpers.json.val(arg, 'name', '');

        if(name){
            d[name] = arg;
        }

        if(props.onChange){
            props.onChange(d);
        };
    }

    const remove = (name) => {
        let d = helpers.json.copy(data);

        if(name){
            delete d[name];
        }

        if(props.onChange){
            props.onChange(d);
        };
    }

    const addForm = (label, labelText) => {
        return (
            <HtmlAttributeAddDrawer
                {...props}
                label={label}
                onChange={onChange}
                labelText={labelText}
            />
        )
    }

    const header = (name) => {
        const cur = current(name);

        return (
            <div className='full bxs flx-sb pd-rl16'>
                <ul className='bxs flx-vc flx-sb'>
                    <li className='pd-r10 txt-xs'>
                        <p className='full bxs'>{name}</p>
                    </li>
                </ul>
                <ul className='bxs flx-vc'>
                    <li className='pd-l10 cp txt-xxs link-u ns' onClick={() => {remove(name)}}>Remove</li>
                    <li className='pd-l10 cp txt-xxs link-u ns' onClick={() => {toggle(name)}}>{cur?'Collapse':'Expend'}</li>
                </ul>
            </div>
        )
    }

    const onValmapExpend = (map, name) => {
        if(props.onExpend){
            props.onExpend(`${getmap(name)}.${map}`)
        }
    }

    const valuemapchange = (arg, node) => {
        let mv = `${node}.valuemap`;
        let d = helpers.json.copy(data);
                helpers.json.remove(d, mv);
            d = helpers.json.set(d, mv, arg);

            if(props.onChange){
                props.onChange(d);
            };
    }

    const valmapActive = (name) => {
       return helpers.string.replace.word(expended, `${getmap(name)}.`, '');
    }

    const details = (name) => {
        const cur = current(name);
        const d = helpers.json.val(data, name, {});

        if(cur){
            return (
                <DsValuemap
                    active={valmapActive(name)}
                    runtimeData={props.runtimeData}
                    valuemap={helpers.json.val(d, 'valuemap')}
                    onExpend={(arg) => {onValmapExpend(arg, name)}}
                    onChange={(arg) => {valuemapchange(arg, name)}}
                    valuetype={helpers.json.val(d, 'type', 'string')}
                />
            )
        }else{
            return <></>
        }
    }

    const attrs = (li) => {
        return li.map((name, i) => {
            const cur = current(name);

            return (
                <div className='full bxs bdr-c00104 bdr-1 bdr-wrln bdr-wbn' key={id+i}>
                     <div className={`full bxs pd-tb4 hbg-c00102 anim ${cur?'bg-c00102':''}`}>
                        {header(name)}
                    </div>
                    <div className='full bxs pd-rl10'>
                        {details(name)}
                    </div>
                </div>
            )
        })
    }

    const attrLabel = () => {
        let map = {
            attrs:'HTML',
            dataAttrs:'Data'
        }
        let type = helpers.json.val(props, 'type', 'attrs')

        return helpers.json.val(map, type, '')
    }

    const ui = () => {
        if(list && list.length > 0){
            return (
                <>
                    {attrs(list)}
                    {addForm(addmore, '')}
                </>
            )
        }else{
            return (
                <div className='full bxs pd-rl20 pd-tb12'>
                    <p className='txt-sm fm-md'>{attrLabel()} Attributes are not configured?</p>
                    <p className='full txt-xs mr-tb2'>Lets start from beginning.</p>
                    {addForm(startLabel, '')}
                </div>
            )
        }
    }

    return ui();
}

export default Comp;