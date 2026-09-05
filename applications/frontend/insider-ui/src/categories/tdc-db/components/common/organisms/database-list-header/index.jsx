import helpers from 'ui-helpers';
import AddNewDatabase from 'aio-app-ui-tdc-db-organisms/add-new-database';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const ui = () => {
        return (
            <div className='full bxs pd-rl16 pd-tb12 flx-sb bdr-c00104 bdr-1 bdr-wrln bdr-wtn'>
                <div className='txt-md fm-sb'>Database list</div>
                <ul className='flx-vc'>
                    <AddNewDatabase {...props} />
                </ul>
            </div>
        )
    }

    return ui()
}

export default Comp;