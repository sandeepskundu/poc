import helpers from 'ui-helpers';

const Comp = (dprops) => {
    let props = helpers.element.jsx.props.define({}, dprops);

    let details = helpers.json.val(props, 'data', {});
    let childmap = helpers.json.val(props, 'configs.childsMap', {});
    let type = helpers.json.val(_siteProps_, 'router.params.type', '');
    let parent = helpers.json.val(props, 'details.data.parentData', {});

    const cls = () => {
        let rval = ['full bxs pd-rl16 pd-tb10 full bdr-c00104 bdr-1 bdr-wrln bdr-wtn pd-rl10 anim hbg-c00103']
        let odd = helpers.is.odd(props.index || 0);

        if(odd){
            rval.push('bg-c00102');
        }

        return rval.join(' ');
    }

    const blank = () => {
        return (
            <ul className='full flx-sb flx-vc blank-holder'>
                <li className='txt-sm'><span className='blank'>aio-application-name</span></li>
                <li className='txt-sm'>
                    <ul className='flx-vc'>
                        <li className='mr-l16'><span className='blank'>Update</span></li>
                        <li className='mr-l16'><span className='blank'>view</span></li>
                    </ul>
                </li>
            </ul>
        )
    }

    const childLink = (next) => {
        const p = {
            type:next,
            mode:'api',
            appId:helpers.json.val(_siteProps_, 'router.params.appId', '')
        }

        if(next != 'controller'){
           p.parentId = helpers.json.val(details, 'hashId');    
        }

        if(next === 'update'){
            helpers.url.route.redirect('tdc-application.method', {
                params:{...p, ...{
                    methodId:helpers.json.val(details, 'hashId'),
                    parentId:helpers.json.val(details, 'parentId'),
                }},
                query:{
                    jobParent:helpers.json.val(parent, 'hashId', '')
                }
            });
        }else{
            helpers.url.route.redirect('tdc-application.controller', {
                params:p
            });
        }
    }

    const childsDetails = () => {
        const next = helpers.json.val(childmap, type, 'method')

        return (
            <li className='mr-l16 mr-l16 link-u ns txt-xs' onClick={() => {childLink(next)}}>{helpers.string.transform.camelize(next)}</li>
        )
    }

    const ui = () => {
        if(props.blank){
            return (
                <div className={cls()}>
                    {blank()}
                </div>
            )
        }else{
            return (
                <div className={cls()}>
                    <ul className='full flx-sb flx-vc'>
                        <li className='txt-sm '><span className='fm-sb hide'>Name : </span>{helpers.json.val(details, 'name')}</li>
                        <li className='txt-sm'>
                            <ul className='flx-vc'>
                                {childsDetails()}
                            </ul>
                        </li>
                    </ul>
                </div>
            )
        }
    }

    return ui()
}

export default Comp;