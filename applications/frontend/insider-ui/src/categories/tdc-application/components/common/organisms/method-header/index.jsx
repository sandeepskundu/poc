import helpers from 'ui-helpers';
import CreateControllerDrawer from 'aio-app-ui-tdc-application-organisms/create-controller-drawer';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(10)
    const type = helpers.json.val(_siteProps_, 'router.params.type', '');

    const goback = (pId) => {
        helpers.url.route.redirect('tdc-application.controller', {
            params:{
                parentId:pId,
                type:'method',
                methodId:null,
                appId:helpers.json.val(_siteProps_, 'router.params.appId', ''),
            }
        });
    }

    const parent = () => {
        let pId = helpers.json.val(_siteProps_, 'pageRequest.query.jobParent');

        if(pId){
            return <li className='mr-l16 link-u ns txt-xs'><span className='cp' onClick={() => {goback(pId)}}>Back to methods</span></li>
        }
    }

    const ui = () => {
        return (
            <>
                <div className='full bxs pd-rl16 pd-tb12 flx-sb bdr-c00104 bdr-1 bdr-wrln bdr-wtn bg-c00103'>
                    <div className='txt-md fm-sb'>Method details</div>
                    <ul className='flx-vc'>
                        {parent()}
                    </ul>
                </div>
                <CreateControllerDrawer {...props} id={id} />
            </>
            
        )
    }

    return ui()
}

export default Comp;