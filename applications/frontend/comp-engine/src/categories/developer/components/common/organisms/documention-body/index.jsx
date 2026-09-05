import FoundationBody from 'aio-app-ui-developer-organisms/foundation-body';
import StorybookDocument from 'aio-app-ui-developer-organisms/storybook-document';

const Comp = (props) => {
    let cate = helpers.json.get(_siteProps_, 'router.params.category', '');
    let subcate = helpers.json.get(_siteProps_, 'router.params.subcate', '');

    const ui = () => {
        if(cate === 'designsystem' && subcate === 'uilibs'){
            return <StorybookDocument />
        };

        if(cate === 'designsystem' && subcate === 'foundation'){
            return <FoundationBody />
        };

        return <></>
    }

    return ui()
}

export default Comp;