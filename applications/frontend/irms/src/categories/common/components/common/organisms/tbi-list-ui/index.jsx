import helpers from 'ui-helpers';
import mhelper from 'aio-app-ui-common-modules';
import TbiResultList from 'aio-app-ui-common-molecules/tbi-result-list';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    const blank = helpers.json.val(props, 'blank');
    const results = helpers.json.val(props, 'results', []);
    const action = helpers.json.val(_siteProps_, 'router.params.action', '');
    const type = helpers.json.val(props, `configs.access.role.type.default`, [])

    let current = 0;


    const onResp = (arg) => {
        current = current+1;

        if(current < type.length){
            api(current);
        }else{
            window.location.reload();
        }
    }

    const api = (i) => {
        current = i;
        mhelper.api.tbiCreate.init({
            request:{
                data:{
                    access:helpers.json.val(type, `${i}.id`, ''),
                    type:helpers.json.val(_siteProps_, 'router.params.type', ''),
                    itemId:helpers.json.val(_siteProps_, 'router.params.mId', ''),
                    relation:helpers.json.val(_siteProps_, 'router.params.relation', '')
                }
            }
        }, onResp);
    }

    const noResults = () => {
        if(action === 'view'){
            return (
                <div className='full'>
                    <div className='full bxs pd-t20 pd-rl20'>
                        <p className='txt-xl fm-md'>Team list not found?</p>
                        <p className='full txt-xs mr-tb4'>Lets create set by clicking on link below</p>
                        <span className="link-u ns cp txt-xs" onClick={() => {api(0)}}>Create teams</span>
                    </div>
                </div>
            )
        }
    }

    const list = () => {
        if(blank || results.length > 0){
            return (
                <TbiResultList {...props} />
            )
        }else{
            return noResults();
        }
    }

    const ui = () => {
        return list();
    }

    return ui()
}

export default Comp;