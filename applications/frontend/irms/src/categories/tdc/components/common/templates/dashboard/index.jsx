import helpers from 'ui-helpers';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    const mId = helpers.json.val(props, 'auth.uIds.merchant', '');
    
    const ui = () => {
        return (
            <ul className='full bxs pd-t24 pd-rl24 grid-wrapper grid-layout-8'>
                <li className='grid pd-r16 link-u' onClick={() => {helpers.url.route.redirect('tdc.apps', {params:{}})}}>Applications</li>
                <li className='grid pd-r16 link-u' onClick={() => {helpers.url.route.redirect('common.offices', {params:{action:"view", eId:mId}})}}>Master Data</li>
                <li className='grid pd-r16 link-u' onClick={() => {helpers.url.route.redirect('common.bu', {params:{action:"view", eId:mId}})}}>Database</li>
                <li className='grid pd-r16 link-u' onClick={() => {helpers.url.route.redirect('common.departments', {params:{action:"view", mId:mId}})}}>DevOps</li>
                <li className='grid pd-r16 link-u' onClick={() => {helpers.url.route.redirect('access.role', {params:{action:"view", type:1, mId:mId}})}}>Design System</li>
                <li className='grid pd-r16 link-u' onClick={() => {helpers.url.route.redirect('access.map', {params:{action:"view", type:1, mId:mId}})}}>CMS</li>
                <li className='grid pd-r16 link-u' onClick={() => {helpers.url.route.redirect('access.map', {params:{action:"view", type:1, mId:mId}})}}>Interface Kit</li>
            </ul>
        )  
    }

    return ui();
}

export default Comp;