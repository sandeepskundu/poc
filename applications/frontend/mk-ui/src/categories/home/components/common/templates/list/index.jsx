import helpers from 'ui-helpers';

import FileUploader from './file-uploader';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    
    const ui = () => {
        return (
            <ul className='full bxs pd-t24 pd-rl24 grid-wrapper grid-layout-6'>
                <li className='grid pd-r16 link-u' onClick={() => {helpers.url.route.redirect('tdc.home')}}>Development Center</li>
                <li>
                    <FileUploader />
                </li>
            </ul>
        )  
    }

    return ui();
}

export default Comp;