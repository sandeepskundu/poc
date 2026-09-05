import helpers from 'ui-helpers';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    
    const ui = () => {
        return (
            <ul className='full bxs pd-t24 pd-rl24 grid-wrapper grid-layout-6'>
                <li className='grid pd-r16 link-u' onClick={() => {helpers.url.route.redirect('empManagement.onboarding', {params:{action:'initial'}})}}>On-boarding</li>
                <li className='grid pd-r16 link-u' onClick={() => {helpers.url.route.redirect('empManagement.directory', {params:{action:'list'}})}}>Employee Directory</li>
            </ul>
        )  
    }

    return ui();
}

export default Comp;