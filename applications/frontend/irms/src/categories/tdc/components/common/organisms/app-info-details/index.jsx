import helpers from 'ui-helpers';
import DetailsInput from 'aio-app-ui-tdc-atoms/details-input';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const ui = () => {
        return (
            <ul className='full bxs grid-wrapper bxs'>
                <li className='grid-w4 pd-rl12 bxs pd-tb16'>
                    <DetailsInput
                        {...props}
                        label="Version"
                        valuemap="appInfo.version"
                    />
                </li>
                <li className='grid-w4 pd-rl12 bxs pd-tb16'>
                    <DetailsInput
                        {...props}
                        label="Author"
                        valuemap="appInfo.author"
                    />
                </li>
                <li className='full pd-rl12 bxs pd-tb16'>
                     <DetailsInput
                        {...props}
                        label="Description"
                        valuemap="appInfo.description"
                    />
                </li>
            </ul>
        )
    }

    return ui()
}

export default Comp;