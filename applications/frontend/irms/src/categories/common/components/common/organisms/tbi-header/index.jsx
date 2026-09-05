import helpers from 'ui-helpers';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    const action = helpers.json.val(_siteProps_, 'router.params.action');

    const redirect = () => {
        helpers.url.route.redirect('common.tbi', {
            params:{
                id:"",
                action:'view'
            }
        })
    }
    
    const addlink = () => {
        if(action === 'view'){
            // return <TbiForm {...props} />
        }else{
             if(action === 'update'){
                return <span className='cp txt-xs link-u ns' onClick={() => {redirect()}}>View Sibling</span>
            }
        }
    }

    const heading = () => {
        if(action === 'view'){
            return <div className='txt-md fm-sb'>Teams</div>
        }else{
            return <div className='txt-md fm-sb'>Team details</div>
        }
    }

    return (
        <div className='full bxs pd-rl16 pd-tb12 flx-sb bdr-c00104 bdr-1 bdr-wrln bdr-wtn bg-c00102'>
            {heading()}
            <ul className='flx-vc'>
                {addlink()}
            </ul>
        </div>
    )
}

export default Comp 