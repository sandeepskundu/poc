import LayoutBuilder from 'aio-app-ui-templates/page-layout';
import EmployerBaseTeam from 'aio-app-ui-common-templates/employer-base-team';

const DESKTOPSRP = (props) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appPage={<EmployerBaseTeam {...props} />}
        />
    )
}

export default DESKTOPSRP;