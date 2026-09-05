import helpers from 'ui-helpers';
import ComponentPropsDetailInputs from 'aio-app-ui-tdc-ds-molecules/component-prop-detail-inputs';
import ComponentPropsConfigDetails from 'aio-app-ui-tdc-ds-molecules/component-prop-config-details';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(10);
    const active = helpers.json.val(props, 'expended.current', '');

    const options = [
        {
            "id":"data.details",
            "label":"Prop details"
        }, {
            "id":"data.configs",
            "label":"Prop configs"
        }
    ]

    const toggle = (arg, exp) => {
        if(props.onExpend){
            props.onExpend(exp?'':arg.id);
        }
    }

    const expended = (arg) => {
        return (active && active.indexOf(arg.id) === 0)
    }

    const header = (arg) => {
        const exp = expended(arg);

        return (
            <div className='full bxs flx-sb pd-rl10'>
                <ul className='bxs flx-vc flx-sb'>
                    <li className='pd-r10 txt-sm'>{arg.label}</li>
                </ul>
                <ul className='bxs flx-vc'>
                    <li className='pd-r10 cp txt-xs link-u ns' onClick={() => {toggle(arg, exp)}}>{exp?'Collapse':'Expend'}</li>
                </ul>
            </div>
        )
    }

    const details = (arg) => {
        const active = expended(arg);
        const type = helpers.json.val(arg, 'id', '');

        if(active){
            switch (type) {
                case 'data.details':
                    return (
                        <ComponentPropsDetailInputs 
                            {...props}
                            mapping={type}
                            runtimeData={helpers.json.val(props, 'runtimeData', {})}
                        />
                    )
                break;
                case 'data.configs':
                    return (
                        <ComponentPropsConfigDetails 
                            {...props}
                            mapping={type}
                            runtimeData={helpers.json.val(props, 'runtimeData', {})}
                        />
                    )
                break;
                default:
                    return <></>
            }
        }else{
            return <></>
        }
    }

    const list = () => {
        return options.map((arg, i) => {
            return (
                <div className='full bxs anim _hbg-c00103 _bg-c00102' key={id+i}>
                    <div className='bdr-c00104 bdr-1 bdr-wrln bdr-wbn bxs full pd-tb8'>
                        {header(arg)}
                    </div>
                    <div className='full bxs pd-rl1'>
                        {details(arg)}
                    </div>
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

export default Comp 