import helpers from 'ui-helpers';
import CreateComponent from 'aio-app-ui-developer-templates/ui-component/create';
import UpdateComponent from 'aio-app-ui-developer-templates/ui-component/update';

const Comp = (props) => {
    let action = helpers.json.get(_siteProps_, 'router.params.action', '');

    const ui = () => {
        switch (action) {
            case 'update':
                return <UpdateComponent {...props} />
            break;
            case 'create':
                return <CreateComponent {...props} />
            break;
        }
       
    }

    return ui()
}

export default Comp;