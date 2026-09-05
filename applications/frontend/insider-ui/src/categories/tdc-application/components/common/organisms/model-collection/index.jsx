import helpers from 'ui-helpers';
import CollectionsList from 'aio-app-ui-tdc-application-atoms/collection-list';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(10);
    const active = helpers.json.val(props, 'expend.collection', '');
    const options = (() => {
        let rval = [];
        let li = helpers.json.val(props, 'configs.collection.childs');

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
                case 'collection.id':
                    return (
                        <div className='full bxs pd-t16 pd-rl10'>
                            <CollectionsList 
                                details={props.details}
                                configs={props.configs}
                                onChange={props.onChange}
                                modified={helpers.json.val(props, 'details.collection', {})}
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
                <ul className='full bxs grid-wrapper grid-layout-5 pd-tb24'>
                    <li className='grid'>
                        <CollectionsList 
                            details={props.details}
                            configs={props.configs}
                            onChange={props.onChange}
                            modified={helpers.json.val(props, 'details.collection', {})}
                        />
                    </li>
                </ul>
            </>
        )
    }

    return ui();
}

export default Comp;