import helpers from 'ui-helpers';
import OnBoardingRegisterForm from 'aio-app-ui-empManagement-molecules/onboarding-register-form';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const action = helpers.json.val(_siteProps_, 'router.params.action', 'noaction')

    const ui = () => {
        return (
            <div className='full bxs pd-24'>
                <OnBoardingRegisterForm />
            </div>
        )
    }

    return ui();
}

export default Comp;