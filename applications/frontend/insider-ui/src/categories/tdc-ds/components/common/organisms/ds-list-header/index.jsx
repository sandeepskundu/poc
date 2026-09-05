import helpers from 'ui-helpers';
import CreateDsDrawer from 'aio-app-ui-tdc-ds-organisms/create-ds-drawer';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(10)

    const ui = () => {
        return (
            <div className='full bxs pd-rl16 pd-tb12 flx-sb bdr-c00104 bdr-1 bdr-wrln bdr-wtn bg-c00103'>
                <div className='txt-md fm-sb'>Design systems list</div>
                <ul className='flx-vc'>
                    <li className='mr-l16 '>
                        <label htmlFor={id} className='cp link-u ns txt-xs'>+ Create new ds</label>
                        <CreateDsDrawer {...props} data={{}} id={id} />
                    </li>
                </ul>
            </div>
        )
    }

    return ui()
}

export default Comp;