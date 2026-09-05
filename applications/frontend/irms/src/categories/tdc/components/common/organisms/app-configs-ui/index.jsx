import helpers from 'ui-helpers';
import AppWebCacheTime from 'aio-app-ui-tdc-molecules/app-web-cache-time-ui';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const ui = () => {
        return (
            <div className='full pd-rl10 bxs'>
                <AppWebCacheTime {...props} />
            </div>
        )
    }

    return ui()
}

export default Comp;