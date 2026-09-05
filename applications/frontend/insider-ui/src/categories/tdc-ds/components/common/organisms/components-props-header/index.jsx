import helpers from 'ui-helpers';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const heading = () => {
        return <div className='txt-md fm-sb'>Component props details</div>
    }

    return (
        <div className='full bxs pd-rl16 pd-tb12 flx-sb _bdr-c00104 bdr-1 bdr-wrln bdr-wtbn bg-c00102'>
            {heading()}
            <ul className='flx-vc'>
            </ul>
        </div>
    )
}

export default Comp 