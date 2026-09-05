import AppPageWithMenu from 'aio-global-ui/organisms/app-page-with-menu';
import PipelinesItemList from 'aio-app-ui-tdc-devops-templates/pipelines-items-list';

const DESKTOPSRP = (propsny) => {

    const com = () => {
        return (
            <>
                <AppPageWithMenu 
                    appMenu={() => {
                        return (
                            <>
                                {/*--t()--*/}
                            </>
                        )
                    }}

                    appRightMenu={() => {
                        return (
                            <></>
                        )
                    }}

                    appPage={() => {
                        return (
                            <>
                                <div className='full bxs'>
                                    <PipelinesItemList />
                                </div>
                            </>
                        )
                    }}
                />
            </>
        )
    }

    return (
        <>
            <div className='full pd-tb20'>
                {com()}
            </div>
        </>
    )
}

export default DESKTOPSRP;