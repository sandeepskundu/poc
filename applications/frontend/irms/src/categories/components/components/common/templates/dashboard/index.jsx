import helpers from 'ui-helpers';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    
    const ui = () => {
        return (
            <ul className='full bxs pd-t24 pd-rl24 grid-wrapper grid-layout-6'>
                <li className='grid pd-r16 pd-tb10 link-u' onClick={() => {helpers.url.route.redirect('components.typography')}}>Typography</li>
                <li className='grid pd-r16 pd-tb10 link-u' onClick={() => {helpers.url.route.redirect('components.buttons')}}>Buttons</li>
                <li className='grid pd-r16 pd-tb10 link-u' onClick={() => {helpers.url.route.redirect('components.buttonGroup')}}>Button Group</li>
                <li className='grid pd-r16 pd-tb10 link-u' onClick={() => {helpers.url.route.redirect('components.inputs')}}>Inputs</li>
                <li className='grid pd-r16 pd-tb10 link-u' onClick={() => {helpers.url.route.redirect('components.badge')}}>Badge</li>
                <li className='grid pd-r16 pd-tb10 link-u' onClick={() => {helpers.url.route.redirect('components.dot')}}>Dot</li>
                <li className='grid pd-r16 pd-tb10 link-u' onClick={() => {helpers.url.route.redirect('components.image')}}>Image</li>
                <li className='grid pd-r16 pd-tb10 link-u' onClick={() => {helpers.url.route.redirect('components.avatar')}}>Avatar</li>
                <li className='grid pd-r16 pd-tb10 link-u' onClick={() => {helpers.url.route.redirect('components.bubble')}}>Bubble</li>
                <li className='grid pd-r16 pd-tb10 link-u' onClick={() => {helpers.url.route.redirect('components.divider')}}>Divider</li>
                <li className='grid pd-r16 pd-tb10 link-u' onClick={() => {helpers.url.route.redirect('components.contentRow')}}>Content Row</li>
                <li className='grid pd-r16 pd-tb10 link-u' onClick={() => {helpers.url.route.redirect('components.listBox')}}>List box</li>
                <li className='grid pd-r16 pd-tb10 link-u' onClick={() => {helpers.url.route.redirect('components.listItem')}}>List item</li>   
                <li className='grid pd-r16 pd-tb10 link-u' onClick={() => {helpers.url.route.redirect('components.listHeader')}}>List header</li>             
            </ul>
        )  
    }

    return ui();
}

export default Comp;