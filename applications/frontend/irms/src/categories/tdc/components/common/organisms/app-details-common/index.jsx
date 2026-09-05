import helpers from 'ui-helpers';
import DetailsInput from 'aio-app-ui-tdc-atoms/details-input';
import AppInfoDetails from 'aio-app-ui-tdc-organisms/app-info-details';
import AppProtDetails from 'aio-app-ui-tdc-organisms/app-ports-details';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    console.log(props);
    
    const ui = () => {
        return (
            <>
                <ul className='full bxs grid-wrapper grid-layout-4 bxs'>
                    <li className='grid pd-rl12 bxs pd-tb16'>
                        <DetailsInput
                            {...props}
                            valuemap="appName"
                            label="Application name"
                        />
                    </li>
                </ul>
                <div className='full bxs mr-t6'>
                    <AppInfoDetails {...props} />
                </div>
                <div className='full bxs mr-t6'>
                    <AppProtDetails {...props} />
                </div>
            </>
        )
    }

    return ui()
}

export default Comp;