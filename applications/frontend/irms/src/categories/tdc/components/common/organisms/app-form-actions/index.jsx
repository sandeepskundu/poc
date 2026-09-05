import helpers from 'ui-helpers';
import Button from 'aio-global-ui/atoms/form/button';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const save = (type) => {
        if(props.onAction){
            props.onAction(type);
        }
    }

    const ui = () => {
        return (
            <ul className='bxs full fl'>
                <li className='pd-l28 bxs fr'>
                    <Button 
                        label='Save'
                        buttonDs={{
                            size:"md",
                            theme:'000'
                        }}
                        onClick={() => {
                            save('save')
                        }}
                    />
                </li>
                <li className='pd-l28 bxs fr hide'>
                    <Button 
                        label='Cancel'
                        buttonDs={{
                            size:"md",
                            theme:'002'
                        }}
                        onClick={() => {
                            save('cancel')
                        }}
                    />
                </li>
                <li className='pd-l28 bxs fr'>
                    <Button 
                        label='Reset'
                        buttonDs={{
                            size:"md",
                            theme:'002'
                        }}
                        onClick={() => {
                            save('reset')
                        }}
                    />
                </li>
                <li className='pd-l28 bxs fr hide'>
                    <span className='link-u cp txt-sm fl mr-t12'
                        onClick={() => {
                            save('reset')
                        }}
                    >Reset</span>
                </li>
            </ul>
        )
    }

    return ui()
}

export default Comp;