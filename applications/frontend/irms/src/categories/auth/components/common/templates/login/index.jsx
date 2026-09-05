import helpers from 'ui-helpers';
import LoginForm from 'aio-app-ui-auth-organisms/login-from';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const ui = () => {
        return (
            <ul className='full bxs pd-24 grid-wrapper grid-layout-3'>
                <li className='grid bxs pd-r20'>
                    <LoginForm />
                </li>
            </ul>
        )
    }

    return ui();
}

export default Comp;