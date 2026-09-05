import helpers from 'ui-helpers';
import DsThemeCodeInput from 'aio-app-ui-tdc-ds-atoms/ds-theme-code-input';
import DsThemeNameInput from 'aio-app-ui-tdc-ds-atoms/ds-theme-name-input';
import DsThemeDescriptionInput from 'aio-app-ui-tdc-ds-atoms/ds-theme-description-input'

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    
    const blank = helpers.json.val(props, 'details.blank', false);   
    const action = helpers.json.val(_siteProps_, 'router.params.action') 

    const ui = () => {
        if(blank){
            return <></>
        }else{

            if(action === 'fetch'){
                return (
                    <>
                        <li className='grid-w3 pd-r20 bxs'>
                            <p><span className='fm-sb'>Name:</span> {helpers.json.val(props, 'details.data.theme.modified.code', '-')}</p>
                        </li>
                        <li className='grid-w3 pd-r20 bxs'>
                            <p><span className='fm-sb'>Code:</span> {helpers.json.val(props, 'details.data.theme.modified.code', '-')}</p>
                        </li>
                        <li className='grid-w6 pd-r20 bxs'>
                            <p><span className='fm-sb'>Description:</span> {helpers.json.val(props, 'details.data.theme.modified.code', '-')}</p>
                        </li>
                    </>
                )
            }else{
                return (
                    <>
                        <li className='grid-w3 pd-r20 bxs'><DsThemeNameInput {...props} /></li>
                        <li className='grid-w3 pd-r20 bxs'><DsThemeCodeInput {...props} /></li>
                        <li className='grid-w4 pd-r20 bxs'><DsThemeDescriptionInput {...props} /></li>
                        <li className='grid-w2 pd-r20 bxs'><DsThemeDescriptionInput {...props} /></li>
                    </>
                )
            }
            
        }
    }

    return (
        <div className='full bxs pd-t28 pd-b12 grid-wrapper flx-vc'>
            {ui()}
        </div>
        
    )
}

export default Comp;