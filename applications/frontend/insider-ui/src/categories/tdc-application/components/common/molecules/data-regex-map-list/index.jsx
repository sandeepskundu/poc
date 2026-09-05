import helpers from 'ui-helpers';
import ValueEnumMapList from 'aio-app-ui-tdc-application-atoms/enums-value-map-list';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    const valuemap = helpers.json.val(props, 'valuemap', '');
    const value = helpers.json.val(props, `validation.checks.regex.${valuemap === 'both'?'value':valuemap}`, '');

    const onChange = (arg) => {
        if(props.onChange){
            props.onChange(arg);
        }
    }

    const ui = () => {
        return (
            <div className='full bxs grid-wrapper'>
                <ul className='full bxs grid-wrapper'>
                    <li className='grid-w1 pd-r30 pd-t10 nowrap bxs'>{props.type}</li>
                    <li className='grid-w10 bxs'>
                        <ul className='full bxs grid-wrapper'>
                            <ValueEnumMapList 
                                {...props}
                                valuemap={value}
                                onChange={(arg) => {onChange(arg)}}
                            />
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }

    return ui();
}

export default Comp;