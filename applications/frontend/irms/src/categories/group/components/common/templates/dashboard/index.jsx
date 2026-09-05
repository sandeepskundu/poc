import helpers from 'ui-helpers';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    const mId = helpers.json.val(props, 'auth.uIds.merchant', '');
    
    const ui = () => {
        return (

            <>
                <ul className='full bxs pd-t24 pd-rl24 grid-wrapper grid-layout-8 txt-14'>
                    <li className='grid pd-r16 link-u' onClick={() => {helpers.url.route.redirect('org.employers', {params:{action:"view", id:''}})}}>Group's Subsidiary</li>
                    <li className='grid pd-r16 link-u' onClick={() => {helpers.url.route.redirect('common.offices', {params:{action:"view", eId:mId}})}}>Offices</li>
                    <li className='grid pd-r16 link-u' onClick={() => {helpers.url.route.redirect('common.bu', {params:{action:"view", eId:mId}})}}>Business Units</li>
                    
                    <li className='grid pd-r16 link-u' onClick={() => {helpers.url.route.redirect('access.role', {params:{action:"view", type:1, mId:mId}})}}>Group Access roles</li>
                    <li className='grid pd-r16 link-u' onClick={() => {helpers.url.route.redirect('access.map', {params:{action:"view", type:1, mId:mId}})}}>Group Access map</li>
                    <li className='grid pd-r16 link-u' onClick={() => {helpers.url.route.redirect('common.team', {params:{action:"view", type:1, mId:mId}})}}>Teams</li>
                </ul>

                <ul className='full bxs pd-t24 pd-rl24 grid-wrapper grid-layout-8 mr-t40 txt-14'>
                    <li className='grid pd-r16 link-u' onClick={() => {helpers.url.route.redirect('common.departments', {params:{action:"view", linkFor:'grp', mId:mId}})}}>Departments</li>
                    <li className='grid pd-r16 link-u' onClick={() => {helpers.url.route.redirect('common.ar', {params:{action:"view", linkFor:'grp', mId:mId}})}}>Access roles</li>
                    <li className='grid pd-r16 link-u' onClick={() => {helpers.url.route.redirect('common.rba', {params:{action:"view", linkFor:'grp', linkType:'grp', mId:mId}})}}>Access maps</li>
                    <li className='grid pd-r16 link-u nowrap' onClick={() => {helpers.url.route.redirect('common.eat', {params:{action:"view", linkFor:'grp', linkType:'grp', mId:mId}})}}>Employer access team</li>
                </ul>
            </>
           
        )  
    }

    return ui();
}

export default Comp;