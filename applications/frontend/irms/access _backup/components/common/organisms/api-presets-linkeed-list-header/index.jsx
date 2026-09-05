import helpers from 'ui-helpers';
import ApiLinkedPresetForm from 'aio-app-ui-access-molecules/api-linked-preset-form';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const details = helpers.json.val(props, 'presetData', {});
    const id = helpers.json.val(_siteProps_, 'router.params.id');
    const action = helpers.json.val(_siteProps_, 'router.params.action');

    const addlink = () => {
        return <ApiLinkedPresetForm {...props} />
    }

    const heading = () => {
        return <div className='txt-md fm-sb'>Api access linked presets</div>
    }

    return (
        <div className='full bxs pd-rl16 pd-tb12 flx-sb bdr-c00104 bdr-1 bdr-wrln bg-c00102 mr-t20'>
            {heading()}
            <ul className='flx-vc'>
                {addlink()}
            </ul>
        </div>
    )
}

export default Comp 