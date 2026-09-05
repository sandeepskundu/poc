import helpers from 'ui-helpers';
import PasswordForm from 'aio-app-ui-auth-organisms/password-from';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const ui = () => {
        return (
            <ul className='full bxs pd-24 grid-wrapper grid-layout-3'>
                <li className='grid bxs pd-r20'>
                    <PasswordForm />
                </li>
            </ul>
        )
    }

    return ui();
}

export default Comp;