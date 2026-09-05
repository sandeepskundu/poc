import helpers from 'ui-helpers';
import EmployeeProfileNameInput from 'aio-app-ui-empManagement-atoms/empolyee-profile-name-input';
import EmployeeTeamDetailsTupple from 'aio-app-ui-empManagement-atoms/employee-team-details-tupple';

const Comp = (dprops) => {
    let props = helpers.element.jsx.props.define({}, dprops);

    console.log(props)

    let id = helpers.random.id(10);
    let blank = helpers.json.val(props, 'blank');
    let type = helpers.json.val(props, 'type', '');
    let results = helpers.json.val(props, `profile.teams.${type}`, []);

    if(blank){
        results = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    }

    const noResults = () => {
        return (
            <div className='full'>
                <div className='full bxs pd-t20 pd-rl20'>
                    <p className='txt-xl fm-md'>Access map data is not found?</p>
                    <p className='full txt-xs mr-tb4'>Lets start from beginning.</p>
                    <label className="link-u ns cp txt-xs" htmlFor={id+'a'}>Lets Start</label>
                </div>
            </div>
        )
    }

    const list = () => {
        return results.map((item, i) => {
            return (
                <div className='full bxs' key={`${id}${i}`}>
                    <EmployeeTeamDetailsTupple {...props} data={item} index={i} type={type} />
                </div>
            )
        })
    }
    
    const ui = () => {
        if(blank || results.length > 0){
            return list()
        }else{
            if(!blank && results.length === 0){
                //return noResults();
            }
        }
    }

    return ui()
}

export default Comp;