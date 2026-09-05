import helpers from 'ui-helpers';
import Text from 'aio-global-ui/atoms/typography/text';
import Display from 'aio-global-ui/atoms/typography/display';
import DsThemeDetailInputs from 'aio-app-ui-tdc-ds-molecules/ds-theme-detail-inputs'

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    
    const details = helpers.json.val(props, 'details', {});
    const blank = helpers.json.val(props, 'details.blank', false);    

    const ui = () => {
        if(blank){

        }else{
            return (
                <>
                    <Display element="h1" size="48" family="sb">{helpers.json.val(details, 'data.rootTheme.combined.heading', '')}</Display>
                    <Text>{helpers.json.val(details, 'data.rootTheme.combined.description', '')}</Text>
                    <div className='full bxs'>
                        <DsThemeDetailInputs {...props} />
                    </div>
                </>
            )
        }
    }

    return (
        <div className='full bxs pd-20 bg-c00102'>
            {ui()}
        </div>
        
    )
}

export default Comp;