import helpers from 'ui-helpers';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(10)

    const ui = () => {
        return (
            <div className='full bxs pd-rl16 pd-tb12 flx-sb bdr-c00104 bdr-1 bdr-wrln bdr-wtn bg-c00103'>
                <div className='txt-md fm-sb'>Design systems details</div>
            </div>
        )
    }

    return ui()
}

export default Comp;