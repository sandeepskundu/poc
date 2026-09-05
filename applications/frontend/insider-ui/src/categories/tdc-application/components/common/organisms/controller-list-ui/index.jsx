import helpers from 'ui-helpers';
import CreateControllerDrawer from 'aio-app-ui-tdc-application-organisms/create-controller-drawer';
import ControllersResultsList from 'aio-app-ui-tdc-application-molecules/controller-results-list';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(10)
    const blank = helpers.json.val(props, 'details.blank');
    const type = helpers.json.val(_siteProps_, 'router.params.type');
    const results = helpers.json.val(props, 'details.data.results', []);
    const parent = helpers.json.val(props, 'details.data.parentData', {});

    const childLink = () => {
        const p = {
            type:type,
            mode:'api',
            appId:helpers.json.val(_siteProps_, 'router.params.appId', ''),
            parentId:helpers.json.val(_siteProps_, 'router.params.parentId', '')
        }

        if(type === 'method'){
            helpers.url.route.redirect('tdc-application.method', {
                params:{...p, ...{type:'create'}},
                query:{
                    jobParent:helpers.json.val(parent, 'hashId', '')
                }
            })
        }
    }

    const letsart = () => {
        if(type === 'method'){
            return <span className="link-u ns cp txt-xs" onClick={() => {childLink()}}>Lets Start</span>
        }else{
            return (
                <>
                    <label className="link-u ns cp txt-xs" htmlFor={id}>Lets Start</label>
                    <CreateControllerDrawer {...props} id={id} />
                </>
                
            )   
        }
    }
    

    const ui = () => {
        if(blank || results.length > 0){
            return (
                <ControllersResultsList 
                    {...props}
                    blank={blank}
                    results={results}
                />
            )
        }else{
            return (
                <div className='full'>
                    <div className='full bxs pd-t20 pd-rl20'>
                        <p className='txt-x fm-md'>{helpers.string.transform.camelize(type)} is not defined?</p>
                        <p className='full txt-xs mr-tb4'>Lets start from beginning.</p>
                        {letsart()}
                    </div>
                </div>
            )
        }
    }

    return ui()
}

export default Comp;