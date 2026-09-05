import helpers from 'ui-helpers';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    return (
        <div className='full bxs'>
            <p>JSX component</p>
        </div>
    )
}

export default Comp;