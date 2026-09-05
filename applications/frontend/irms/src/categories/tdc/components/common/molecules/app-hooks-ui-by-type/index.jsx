import helpers from 'ui-helpers';
import MappingList from 'aio-app-ui-atoms/mapping-list';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    const details = helpers.json.copy(props.details || {});
    const pId = helpers.json.val(props, 'parent.id');
    const prefix = helpers.json.val(props, 'parent.prefix', '');
    const hooksLabel = helpers.json.val(props, 'configs.appConfigs.hooksLables', {});
    const options = helpers.json.keys(hooksLabel);
    const active = helpers.json.val(props, 'expended', '');

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
        let d = helpers.json.copy(details);
            d = helpers.json.set(d, `hooks.${pId}.${name}`, valmap, false, true);
        
            if(props.onChange){
                props.onChange(d, 'hooks', true);
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

    const itemParser = (rval, arg) => {
        rval.id = arg.vd.id;
        return rval;
    }

    const detailsUi = (name) => {
        const exp = expended(name);

        if(exp){
            const kname = key(name);
            return (
                <MappingList
                    apies={{
                        root:{
                            name:'access.role.getByMapId',
                            request:{
                                options:{
                                    endpoint:'access.role.getByMapId',
                                },
                                request:{
                                    params:{
                                        id:'672cac644a0dded765b5c3b2'
                                    }
                                }
                            },
                        },
                        childs:{
                            name:'access.role.getByMapId',
                            request:{
                                options:{
                                    endpoint:'access.role.getByMapId',
                                }
                            },
                        }
                    }}
                    selectorKey="id"
                    itemParser={itemParser}
                    gridCls={'grid-w2 pd-r24'}
                    onChange={(arg) => {onChange(arg.id, kname)}}
                    valuemap={helpers.json.val(details, `hooks.${pId}.${kname}`, '')}
                    validation={helpers.json.val(props, `validation.body.hooks.${pId}`, {})}
                    mappingLastIndexVal={helpers.json.val(props, 'configs.enums.mappingLastIndexVal.required', '__LAST__ITEM__ENUM__')}
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