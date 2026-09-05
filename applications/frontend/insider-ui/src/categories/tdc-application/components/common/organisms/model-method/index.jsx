import helpers from 'ui-helpers';
import MethodDetails from 'aio-app-ui-tdc-application-molecules/model-method/method-details';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(10);
    const active = helpers.json.val(props, 'expend.method', '');
    const options = (() => {
        let rval = [];
        let li = helpers.json.val(props, 'configs.method.childs');

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

    const components = (arg) => {
        if(active === arg.id){
            switch (arg.id) {
                case 'method.details':
                    return (
                        <div className='full bxs pd-t16 pd-rl10'>
                            <MethodDetails 
                                details={props.details}
                                configs={props.configs}
                                onChange={props.onChange}
                                modified={helpers.json.val(props, 'details.method', {})}
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
            const cur = (active === arg.id);
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
            <>
                {/*--list()--*/}
                <MethodDetails 
                    details={props.details}
                    configs={props.configs}
                    onChange={props.onChange}
                    modified={helpers.json.val(props, 'details.method', {})}
                />
            </>
        )
    }

    return ui();
}

export default Comp;