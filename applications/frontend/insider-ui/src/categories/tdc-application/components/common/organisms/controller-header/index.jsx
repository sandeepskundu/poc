import helpers from 'ui-helpers';
import CreateControllerDrawer from 'aio-app-ui-tdc-application-organisms/create-controller-drawer';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(10)
    const type = helpers.json.val(_siteProps_, 'router.params.type');
    const results = helpers.json.val(props, 'details.data.results', []);
    const app = helpers.json.val(props, 'details.data.appDetails', {});
    const parent = helpers.json.val(props, 'details.data.parentData', {});
    const ptype = helpers.json.val(parent, 'type', '');

    const link = () => {
        helpers.url.route.redirect('tdc-application.method', {
            params:{
                mode:'api',
                type:'create',
                methodId:null,
                appId:helpers.json.val(_siteProps_, 'router.params.appId', ''),
                parentId:helpers.json.val(_siteProps_, 'router.params.parentId', '')
            },
            query:{
                jobParent:helpers.json.val(parent, 'hashId', '')
            }
        });
    }

    const goback = () => {
        helpers.url.route.redirect('tdc-application.controller', {
            params:{
                mode:'api',
                type:ptype,
                methodId:null,
                appId:helpers.json.val(app, 'vd.id', ''),
                parentId:helpers.json.val(parent, 'parentId', '')
            }
        });
    }

    const parentLink = () => {
        if(ptype){
            return <li className='mr-l16 link-u ns txt-xs'><span className='cp' onClick={() => {goback()}}>Back to {ptype}s</span></li>
        }
    }

    const createNew = () => {
        const type = helpers.json.val(_siteProps_, 'router.params.type');

        if(type === 'method'){
            if(results.length < 4){
                return <li className='mr-l16 link-u ns txt-xs'><span className='cp' onClick={() => {link()}}>+ Create new {type}</span></li>
            }else{
                return <></>
            }
        }else{
            return <li className='mr-l16 link-u ns txt-xs'><label htmlFor={id} className='cp'>+ Create new {type}</label></li>
        }
    }

    const ui = () => {
        return (
            <>
                <div className='full bxs pd-rl16 pd-tb12 flx-sb bdr-c00104 bdr-1 bdr-wrln bdr-wtn bg-c00103'>
                    <div className='txt-md fm-sb'>{helpers.string.transform.camelize(type)} list</div>
                    <ul className='flx-vc'>
                        {parentLink()}
                        {createNew()}
                    </ul>
                </div>
                <CreateControllerDrawer {...props} id={id} />
            </>
            
        )
    }

    return ui()
}

export default Comp;