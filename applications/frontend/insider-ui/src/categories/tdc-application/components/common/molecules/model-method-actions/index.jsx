import helpers from 'ui-helpers';
import Button from 'aio-global-ui/atoms/form/button';

const AddNewQuery = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const dHash = helpers.crpt.md5(JSON.stringify(props.details));
    const oHash = helpers.crpt.md5(props.original);

    const action = (type) => {
        if(props.onAction){
            props.onAction(type);
        }
    }

    const buttons = () => {
        if(dHash != oHash){
            return (
                <div className='full flx-sb bxs pd-b24'>
                    <div>&nbsp;</div>
                    <ul className='pd-t24 pd-r24 flx-vc'>
                        <li className='pd-l14 bxs hide'>
                            <span className='link-u cp txt-sm fl'
                                onClick={() => {
                                    action('reset')
                                }}
                            >Reset</span>
                        </li>
                        <li className='pd-l24 bxs'>
                            <Button 
                                label='Reset'
                                buttonDs={{
                                    size:"md",
                                    theme:'002'
                                }}
                                onClick={() => {
                                    action('reset')
                                }}
                            />
                        </li>
                        <li className='pd-l24 bxs'>
                            <Button 
                                label='Save'
                                buttonDs={{
                                    size:"md",
                                    theme:'000'
                                }}
                                onClick={() => {
                                    action('save')
                                }}
                            />
                        </li>
                    </ul>
                </div>
            )
        }
    }

    const ui = () => {
        return buttons();
    }

    return ui();
}

export default AddNewQuery;