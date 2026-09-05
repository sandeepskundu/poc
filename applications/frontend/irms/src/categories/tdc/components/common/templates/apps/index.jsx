import helpers from 'ui-helpers';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    const mId = helpers.json.val(props, 'auth.uIds.merchant', '');
    
    const ui = () => {
        return (
            <ul className='full bxs pd-t24 pd-rl24 grid-wrapper grid-layout-8'>
                <li className='grid pd-r16 link-u' onClick={() => {helpers.url.route.redirect('tdc.apps-list', {params:{type:'ui'}})}}>UI Applications</li>
                <li className='grid pd-r16 link-u' onClick={() => {helpers.url.route.redirect('tdc.apps-list', {params:{type:'api'}})}}>API Applications</li>
            </ul>
        )  
    }

    return ui();
}

export default Comp;