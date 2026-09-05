import helpers from 'ui-helpers';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const link = (path, label) => {
        return (
            <li className='grid pd-r16 link-u'>
                <span onClick={() => {helpers.url.route.redirect(`tdc-ds.${path}`, {params:{}})}}>{label}</span>
            </li>
        )
    }
    
    const ui = () => {
        return (
            <ul className='full bxs pd-t24 pd-rl24 grid-wrapper grid-layout-6'>
                {link('ds-list', 'Design system')}
                {link('themes', 'Themes')}
            </ul>
        )  
    }

    return ui();
}

export default Comp;