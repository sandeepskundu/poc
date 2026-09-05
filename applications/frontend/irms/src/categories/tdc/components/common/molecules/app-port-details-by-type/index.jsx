import helpers from 'ui-helpers';
import NumberInput from 'aio-app-ui-tdc-atoms/number-input';
import AppPortType from 'aio-app-ui-tdc-atoms/app-port-type';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const type = helpers.json.val(props, 'type.id', '')

    const ui = () => {
        return (
            <ul className='grid-wrapper grid-layout-6 flx-vc'>
                <li className='grid pd-rl12'>
                    <AppPortType {...props} />
                </li>
                <li className='grid pd-rl12'>
                    <NumberInput {...props} valuemap={`appConfig.ports.${type}`} label="Port number" />
                </li>
                <li className='grid pd-rl12'>
                    <NumberInput {...props} valuemap={`appConfig.instances.${type}`} label="Instances" />
                </li>
            </ul>
        )
    }

    return ui()
}

export default Comp;