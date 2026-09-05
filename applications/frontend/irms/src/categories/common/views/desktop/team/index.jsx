import TeamsList from 'aio-app-ui-common-templates/teams';
import LayoutBuilder from 'aio-app-ui-templates/page-layout';

const DESKTOPSRP = (props) => {
    return (
        <LayoutBuilder
            appMenu={''}
            appPage={<TeamsList {...props} />}
        />
    )
}

export default DESKTOPSRP;