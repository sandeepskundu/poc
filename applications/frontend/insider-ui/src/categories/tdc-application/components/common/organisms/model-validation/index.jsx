import helpers from 'ui-helpers';
import RequestDataValidation from 'aio-app-ui-tdc-application-templates/validation-request-data';
import RequestDetails from 'aio-app-ui-tdc-application-molecules/model-validation/request-details';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(10);
    const active = helpers.json.val(props, 'expend.validation', '');
    const validation = helpers.json.val(props, 'details.validation', {});

    const options = (() => {
        let rval = [];
        let li = helpers.json.val(props, 'configs.validation.childs');

        for(const a in li){
            rval.push(li[a]);
        }

        return rval;
    })();

    const expend = (arg) => {
        if(props.onExpend){
            props.onExpend(arg.id);
        }
    }

    const onChange = (arg, map, reset) => {
        let d = helpers.json.copy(validation);
                helpers.json.remove(d, map);
            d = helpers.json.set(d, map, arg);

            if(props.onChange){
                props.onChange(d, 'validation');
            }
    }

    const current = (arg) => {
        if(active){
            return (active.indexOf(arg.id) === 0)
        }

        return false;
    }

    const components = (arg) => {
        if(current(arg)){
            switch (arg.id) {
                case 'request.server.config':
                    return (
                        <div className='full bxs pd-rl10'>
                            <RequestDetails
                                {...props}
                                parentId={arg.id}
                                details={props.details}
                                configs={props.configs}
                                validation={validation}
                                onExpend={props.onExpend}
                                onChange={(arg, map, reset) => {onChange(arg, map, reset)}}
                            />
                        </div>
                    )
                break;
                case 'request.data.config':
                    return (
                        <div className='full bxs'>
                            <RequestDataValidation
                                {...props}
                                parentId={arg.id}
                                details={props.details}
                                configs={props.configs}
                                validation={validation}
                                onExpend={props.onExpend}
                                onChange={(arg, map, reset) => {onChange(arg, map, reset)}}
                            />
                        </div>
                    )
                break;
                default:
                    return <></>

            }
        }else {
            return <></>
        }
    }

    const cls = (cur) => {
        let rv = ['full bxs flx-sb pd-10']

        if(cur){
            rv.push('bg-c00102');
        }

        return rv.join(' ');
    }

    const list = () => {
        return options.map((arg, i) => {
            const cur = current(arg);
            return (
                <div className='full bxs full bdr-c00104 bdr-1 bdr-wrln bdr-wbn anim' key={id+i}>
                    <div className={cls(cur)}>
                        <span className='txt-sm fm-md'>{arg.label}</span>
                        <ul className=''>
                            <li className='mr-l16 link-u ns cp txt-xs' onClick={() => {expend(arg)}}>{(cur)?'Collapse':'Expend'}</li>
                        </ul>
                    </div>
                    {components(arg)}
                </div>
            )
        })
    }

    const ui = () => {
        return (
            <div className='full'>
                {list()}
            </div>
        )
    }

    return ui();
}

export default Comp;