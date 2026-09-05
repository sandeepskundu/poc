import helpers from 'ui-helpers';
import AppDbList from 'aio-app-ui-tdc-atoms/app-db-list';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const ui = () => {
        return (
            <div className='full grid-wrapper grid-layout-4 bxs pd-tb20'>
                <li className='grid bxs pd-r20'>
                    <AppDbList {...props} />
                </li>
            </div>
        )
    }

    return ui()
}

export default Comp;