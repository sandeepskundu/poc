import helpers from 'ui-helpers';

const Comp = (dprops) => {
    const id = helpers.random.id(10);

    return (
       <ul className='full bxs pd-t24 pd-rl24 grid-wrapper grid-layout-6'>
            <li className='grid pd-r16 link-u' onClick={() => {helpers.url.route.redirect('tdc-backend.masterDataList', {
                params:{
                    action:'view'
                }
            })}}>Master Data List</li>
        </ul>
    )
}

export default Comp 