import LayoutBuilder from 'aio-app-ui-templates/page-layout';

const DESKTOPSRP = (dprops) => {
    return (
        <LayoutBuilder
            appMenu={''}
            _appRightMenu={null}
            appPage={() => {
                return (
                    <p>Sandeep Kundu</p>
                )
            }}
        />
    )
}

export default DESKTOPSRP;