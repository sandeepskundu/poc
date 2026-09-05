import helpers from 'ui-helpers';
import Toggle from 'aio-global-ui/atoms/form/toggle';
import DeleteLink from 'aio-app-ui-tdc-application-molecules/data-validation-req-delete';
import VirtaulValidationDetails from 'aio-app-ui-tdc-application-molecules/validation-virtaul-details';
import ValidationReqDataDetailsByType from 'aio-app-ui-tdc-application-molecules/validation-req-data-details-by-type';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(16);
    const mapping = helpers.json.val(props, 'mapping', []);
    const parentId = helpers.json.val(props, 'parentId', '');
    const validation = helpers.json.val(props, 'validation', {});
    const active = helpers.json.val(props, 'expend.validation', '');
    const ctypes = helpers.json.val(props, 'configs.validation.checks.types', {});
    const virtual = helpers.json.val(props, 'validation.virtual.validation.enabled', false)

    const expend = (() => {
        let map = mapping.join('.')
        return (active.indexOf(`${parentId}.${map}`) === 0)
    })();
 
    const onVirtualChange = (checked) => {
        let map =  mapping.join('.');
        if(props.onChange){
            if(checked){
                props.onChange({
                    virtual:{
                        validation:{
                            enabled:true
                        }
                    }
                }, map, true);
            }else{
                props.onChange({}, map, true);
            }
        }
    }

    const toggle = () => {
        if(props.onExpend){
            let map = [...mapping];

            if(expend){
                map.pop();
                map = map.join('.');
            }else{
                map = map.join('.');
            }
            
            props.onExpend(`${parentId}.${map}`);
        }
    }

    const onDelete = (arg, map, reset) => {
        if(props.onChange){
            props.onChange(arg, map, reset);
        };
    }

    const dlink = () => {
        return (
            <DeleteLink 
                type={props.type}
                onChange={onDelete}
                active={props.active}
                mapping={[...mapping]}
                details={props.details}
                configs={props.configs}
                validation={validation}
            />
        )
    }

    const header = () => {
        return (
            <div className='full bxs pd-10'>
                <div className='full bxs flx-sb'>
                    <ul className='bxs flx-vc flx-sb'>
                        <li className='pd-r10 txt-sm'>{props.node}</li>
                    </ul>
                    <ul className='bxs flx-vc'>
                        {dlink()}
                        <li className='pd-l10 cp txt-xs link-u ns'>
                            <span onClick={() => toggle()}>{expend?'Collapse':'Expend'}</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    const cls = (i) => {
        let rval = ['full']
        let odd = helpers.is.odd(i);

            if(odd){
                rval.push('bg-c00203');
            };

        return rval.join(' ');
    }

    const list = () => {
        if(expend){
            let li = helpers.json.keys(ctypes);
            if(li && li.length > 0){
                return li.map((name, i) => {
                    return (
                        <div className={cls(i)} key={id+i}>
                            <ValidationReqDataDetailsByType
                                {...props}
                                type={ctypes[name]}
                                parentId={parentId}
                                active={props.active}
                                details={props.details}
                                configs={props.configs}
                                onToggle={props.onToggle}
                                validation={props.validation}
                                mapping={[...mapping, ctypes[name].id]}
                                onChange={(arg, map, reset) => {
                                    props.onChange(arg, map, reset)
                                }}
                            />
                        </div>  
                    )
                })
            }else{
                return <></>
            }
        }else{
            return <></>
        }
    }

    const template = () => {
        if(virtual){
            return (
                <div className='full bxs'>
                    <VirtaulValidationDetails 
                        {...props}
                        parentId={parentId}
                        active={props.active}
                        mapping={[...mapping]}
                        details={props.details}
                        configs={props.configs}
                        onToggle={props.onToggle}
                        onChange={props.onChange}
                        validation={props.validation}
                        
                    />
                </div>
                
            )
        }else{
            return list();
        }
    }

    const ui = () => {
        return (
            <div className='full bxs'>
                {header()}
                <div className={expend?'full bxs _bg-c00202':'full bxs'}>
                    <div className='full bxs pd-t8 pd-b10'>
                        <Toggle 
                            checked={virtual}
                            label='Virtual validation'
                            onChange={(checked) => {
                                onVirtualChange(checked);
                            }}
                        />
                    </div>
                    {template()}
                </div>
            </div>
        )
    }

    return ui();
}

export default Comp;