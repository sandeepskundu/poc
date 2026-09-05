import helpers from 'ui-helpers';
import AccessRoleActionToggle from 'aio-app-ui-access-atoms/access-role-action-toggle';

const Comp = (dprops) => {
    let props = helpers.element.jsx.props.define({}, dprops);

    let id = helpers.random.id(10);
    let list = helpers.json.val(props, 'details.actions', {});
        list = helpers.json.keys(list);

    const ui = () => {
        return list.map((name, i) => {
            return (
                <li className='grid bxs' key={id+i}>
                    <AccessRoleActionToggle
                        action={name}
                        details={props.details}
                        onChange={props.onChange}
                        blank={helpers.json.val(props, 'blank')}
                    />
                </li>
            )
        });
    }

    return (
        <ul className='grid-wrapper grid-layout-4'>
            {ui()}
        </ul>
    )
}

export default Comp;