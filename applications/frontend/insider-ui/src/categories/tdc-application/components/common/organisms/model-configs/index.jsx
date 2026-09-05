import helpers from 'ui-helpers';
import ModelQuery from 'aio-app-ui-tdc-application-organisms/model-configs/query';
import Md5Hash from 'aio-app-ui-tdc-application-organisms/model-configs/md5-hash';
import ValueMap from 'aio-app-ui-tdc-application-organisms/model-configs/valuemap';
import ModelSignature from 'aio-app-ui-tdc-application-organisms/model-configs/signature';
import ModelPagination from 'aio-app-ui-tdc-application-organisms/model-configs/pagination';
import ResponseExclude from 'aio-app-ui-tdc-application-organisms/model-configs/response-exclude';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(10);
    const active = helpers.json.val(props, 'expend.model', '');
    const options = (() => {
        let rval = [];
        let li = helpers.json.val(props, 'configs.model.childs');

        for(const a in li){
            rval.push(li[a]);
        }

        return rval;
    })();

    const current = (arg) => {
        return (active.indexOf(arg.id) === 0)
    }

    const expend = (arg) => {
        if(props.onExpend){
            props.onExpend(arg.id);
        }
    }

    const components = (arg) => {
        if(current(arg)){
            switch (arg.id) {
                case 'query':
                    return (
                        <div className='full bxs pd-t16 pd-rl10'>
                            <ModelQuery
                                {...props}
                                parentId={arg.id}
                                details={props.details}
                                configs={props.configs}
                                onChange={props.onChange}
                                onExpend={props.onExpend}
                                modified={helpers.json.val(props, 'details.model.query', {})}
                            />
                        </div>
                    )
                break;
                case 'pagination':
                    return (
                        <div className='full bxs pd-t16'>
                            <ModelPagination
                                {...props}
                                parentId={arg.id}
                                details={props.details}
                                configs={props.configs}
                                onChange={props.onChange}
                                onExpend={props.onExpend}
                                modified={helpers.json.val(props, 'details.model.pagination', {})}
                                //editable={mapping?true:false}
                            />
                        </div>
                    )
                break;
                case 'signature':
                    return (
                        <div className='full bxs pd-t16'>
                            <ModelSignature
                                {...props}
                                parentId={arg.id}
                                details={props.details}
                                configs={props.configs}
                                onChange={props.onChange}
                                onExpend={props.onExpend}
                                modified={helpers.json.val(props, 'details.model.signature', {})}
                            />
                        </div>
                    )
                break;
                case 'md5Hash':
                    return (
                        <div className='full bxs'>
                            <Md5Hash
                                {...props}
                                parentId={arg.id}
                                details={props.details}
                                configs={props.configs}
                                onChange={props.onChange}
                                onExpend={props.onExpend}
                                modified={helpers.json.val(props, 'details.model.md5Hash', {})}
                            />
                        </div>
                    )
                break;
                case 'valuemap':
                    return (
                        <div className='full bxs'>
                            <ValueMap
                                {...props}
                                parentId={arg.id}
                                details={props.details}
                                configs={props.configs}
                                onChange={props.onChange}
                                onExpend={props.onExpend}
                                modified={helpers.json.val(props, 'details.model.valuemap', {})}
                            />
                        </div>
                    )
                break;
                case 'response':
                    return (
                        <div className='full bxs pd-t16'>
                            <ResponseExclude
                                {...props}
                                parentId={arg.id} 
                                details={props.details}
                                configs={props.configs}
                                onChange={props.onChange}
                                onExpend={props.onExpend}
                                modified={helpers.json.val(props, 'details.model.response', {})}
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
            <>
                {list()}
            </>
        )
    }

    return ui();
}

export default Comp;