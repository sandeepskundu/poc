import helpers from 'ui-helpers';
import EmployeeProfileNameInput from 'aio-app-ui-empManagement-atoms/empolyee-profile-name-input';
import EmployeeProfileNameTitles from 'aio-app-ui-empManagement-atoms/empolyee-profile-name-titles';

const Comp = (dprops) => {
    let props = helpers.element.jsx.props.define({}, dprops);

    let id = helpers.random.id(10);
    let blank = helpers.json.val(props, 'blank');
    let results = helpers.json.val(props, 'employees', []);
    
    const ui = () => {
        return (
            <ul class="full bxs grid-wrapper grid-layout-4">
                <li className='grid bxs pd-r24'>
                    <EmployeeProfileNameTitles {...props} valuemap="name.title" label="Title" />
                </li>

                <li className='grid bxs pd-r24'>
                    <EmployeeProfileNameInput {...props} valuemap="name.first" label="First name" />
                </li>

                <li className='grid bxs pd-r24'>
                    <EmployeeProfileNameInput {...props} valuemap="name.middle" label="Middle name" />
                </li>

                <li className='grid bxs pd-r24'>
                    <EmployeeProfileNameInput {...props} valuemap="name.last" label="Last name" />
                </li>
            </ul>
        );
    }

    return ui()
}

export default Comp;