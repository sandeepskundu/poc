import helpers from 'ui-helpers';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    const mId = helpers.json.val(props, 'auth.uIds.merchant', '');
    
    const ui = () => {
        return (
            <ul className='full bxs pd-t24 pd-rl24 grid-wrapper grid-layout-8'>
                
            </ul>
        )  
    }

    return ui();
}

export default Comp;