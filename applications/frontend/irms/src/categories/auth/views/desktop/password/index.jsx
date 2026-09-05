import helpers from 'ui-helpers';
import Password from 'aio-app-ui-auth-templates/password';

const DESKTOPSRP = (dprops) => {
    helpers.auth.ifLogin.redirectToRoute('home.dashboard');
    return (
        <Password />
    )
}

export default DESKTOPSRP;