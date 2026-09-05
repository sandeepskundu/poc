import helpers from 'ui-helpers';

const Comp = (dprops) => {
    const id = helpers.random.id(10);

    return (
       <ul className='full bxs pd-t24 pd-rl24 grid-wrapper grid-layout-6'>
            <li className='grid pd-r16 link-u' onClick={() => {helpers.url.route.redirect('tdc-cms.cmsDataList', {
                params:{
                    action:'view'
                }
            })}}>CMS Data List</li>

            <li className='grid pd-r16 link-u' onClick={() => {helpers.url.route.redirect('tdc-cms.uiTemplateList', {
                params:{
                    action:'view'
                }
            })}}>UI Template List</li>
        </ul>
    )
}

export default Comp 