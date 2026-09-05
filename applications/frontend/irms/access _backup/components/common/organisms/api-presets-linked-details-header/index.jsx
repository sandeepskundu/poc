import helpers from 'ui-helpers';
import ApiLinkedPresetForm from 'aio-app-ui-access-molecules/api-linked-preset-form';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    const id = helpers.json.val(_siteProps_, 'router.params.id');

    const addlink = () => {
        return <ApiLinkedPresetForm {...props} />
    }

    const siblings = () => {
        if(id){
            return <span className='cp txt-xs link-u ns' onClick={() => {helpers.url.route.redirect('access.apiPresets', {params:{action:'update',id:id}})}}>View siblings</span>
        }
    }

    const heading = () => {
        return <div className='txt-md fm-sb'>Api access linked presets</div>
    }

    return (
        <div className='full bxs pd-rl16 pd-tb12 flx-sb bdr-c00104 bdr-1 bdr-wrln bg-c00102'>
            {heading()}
            <ul className='flx-vc'>
                {siblings()}
            </ul>
        </div>
    )
}

export default Comp 