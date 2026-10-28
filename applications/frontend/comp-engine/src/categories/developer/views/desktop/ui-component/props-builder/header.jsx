import helpers from 'ui-helpers';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops, helpers);
    const node = props.node || {};
    const type = helpers.json.get(props, 'node.__.type', '');
    const actions = helpers.json.get(props, 'node.__.actions', {});
    const asHeader = helpers.json.get(props, 'node.__.asHeader', false);

    const isRoot = helpers.json.get(props, 'utils.isRoot', false);
    const details = helpers.json.get(props, 'node.__.details.__', {});


    const configs = props.configs || {};
    const builder = props.builder || {};
    const templates = props.templates || {};
    const raw = node.__ || {};
    const excludeActions = helpers.json.get(raw, 'excludeActions', {});

    const error = () => {
        return templates.label.error.ui();
    }

    const label = () => {
        return (
            <>
                <span className='txt-12 fm-md'>{templates.label.withHighlight()}</span>
                {error()}
            </>
        )
    }

    const childCount = () => {

    }

    const addIcon = () => {
        if(isRoot && actions.add){
            return templates.actions.add.ui();
        }
    }

    const modify = () => {
        if(actions.edit){
            return templates.actions.edit.ui()
        }
    }

    const remove = () => {
        
    }

    const ui = () => {
        if(raw.hideHeader){
            return <></>
        };

        return (
            <ul className={`full bxs flx-vc flx-sb pd-10 bg-c00101 bdr-1 bdr-c00104 bdr-tn bdr-rn bdr-ln ${asHeader?' bg-c00103':''}`} key={raw.id}>
                <li className='flx-vc'>
                    {label()}
                    {childCount()}
                </li>
                <li>
                    <div className='flx'>
                        {addIcon()}
                        {modify()}
                        {remove()}
                    </div>
                </li>
            </ul>
        )
        
    }

    return ui();
}

export default Comp;