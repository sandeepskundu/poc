import helpers from 'ui-helpers';
import AppPortDetailsByType from 'aio-app-ui-tdc-molecules/app-port-details-by-type';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(10);
    const modes = helpers.json.val(props,  'configs.appConfigs.appInstanceModes', {})

    const ui = () => {
        if(modes && modes.length > 0){
            return modes.map((arg, i) => {
                return (
                    <div className='full bxs pd-t6 pd-b16' key={id+i}>
                        <AppPortDetailsByType {...props} type={arg} />
                    </div>
                )
            })
        }
    }

    return ui()
}

export default Comp;