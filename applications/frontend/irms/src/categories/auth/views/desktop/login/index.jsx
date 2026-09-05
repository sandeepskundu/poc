import helpers from 'ui-helpers';
import Login from 'aio-app-ui-auth-templates/login';

const DESKTOPSRP = (dprops) => {
    helpers.auth.ifLogin.redirectToRoute('home.dashboard');
    return (
        <Login />
    )
}

export default DESKTOPSRP;