import helpers from 'ui-helpers';
import ApplicationName from 'aio-app-ui-tdc-application-atoms/application-name';
import ApplicationCategory from 'aio-app-ui-tdc-application-atoms/application-category';
import ApplicationInfoDetails from 'aio-app-ui-tdc-application-organisms/application-info-details';
import ApplicationPortsDetails from 'aio-app-ui-tdc-application-organisms/application-ports-details';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    
    const ui = () => {
        return (
            <>
                <ul className='full bxs grid-wrapper grid-layout-4 bxs'>
                    <li className='grid pd-rl12 bxs pd-tb16'>
                        <ApplicationCategory
                            details={props.details}
                            configs={props.configs}
                            onChange={props.onChange}
                        />
                    </li>
                    <li className='grid pd-rl12 bxs pd-tb16'>
                        <ApplicationName
                            onChange={props.onChange}
                            details={props.details}
                            configs={props.configs}
                        />
                    </li>
                </ul>
                <div className='full bxs mr-t6'>
                    <ApplicationInfoDetails 
                        onChange={props.onChange}
                        details={props.details}
                        configs={props.configs}
                    />
                </div>
                <div className='full bxs mr-t16'>
                    <ApplicationPortsDetails
                        details={props.details}
                        configs={props.configs}
                        onChange={props.onChange}
                    />
                </div>
            </>
        )
    }

    return ui()
}

export default Comp;