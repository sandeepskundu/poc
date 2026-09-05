import helpers from 'ui-helpers';

const Comp = (dprops) => {
    const id = helpers.random.id(10);

    return (
       <ul className='full bxs pd-t24 pd-rl24 grid-wrapper grid-layout-6'>
            <li className='grid pd-r16 link-u pd-b20' onClick={() => {helpers.url.route.redirect('tdc-application.dashboard')}}>Application Center</li>
            <li className='grid pd-r16 link-u pd-b20' onClick={() => {helpers.url.route.redirect('tdc-backend.masterData')}}>Master Data</li>
            <li className='grid pd-r16 link-u pd-b20' onClick={() => {helpers.url.route.redirect('tdc-db.dashboard')}}>Database</li>
            <li className='grid pd-r16 link-u pd-b20' onClick={() => {helpers.url.route.redirect('tdc-devops.dashboard')}}>DevOps</li>
            <li className='grid pd-r16 link-u pd-b20' onClick={() => {helpers.url.route.redirect('tdc-ds.dashboard')}}>Design System</li>
            <li className='grid pd-r16 link-u pd-b20' onClick={() => {helpers.url.route.redirect('tdc-cms.cmsData')}}>CMS</li>
            <ll className='grid pd-r16 link-u pd-b20' onClick={() => {helpers.url.route.redirect('tdc-interface-kit.dashboard')}}>Interface Kit</ll>
        </ul>
    )
}

export default Comp 