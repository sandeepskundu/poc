import helpers from 'ui-helpers';

const Comp = (dprops) => { 
    const props = helpers.element.jsx.props.define({}, dprops, helpers);
    const node = props.node || {};
    const configs = props.configs || {};
    const builder = props.builder || {};
    const templates = props.templates || {};
    const raw = node.__ || {};
    
    const canadd = (() => {
        let enabled = {
            and:true,
            nested:true
        }
        let sh = templates.actions.add.show;
        let type = helpers.json.get(raw, 'type', '');
        return (sh && type && enabled[type]);
    })();

    const error = () => {

    }

    const label = () => {
        return (
            <>
                <span className='txt-12 fm-md'>{templates.label.withHighlight()}</span>
                {error()}
            </>
        )
    }

    const expend = () => {
        const show = helpers.json.get(templates, 'actions.expend.show');

        if(show){
            return templates.actions.expend.ui();
        }
    }

    const childCount = () => {

    }

    const addIcon = () => {
        if(canadd){
            return templates.actions.add.ui()
        }
    }

    const modify = () => {
        return templates.actions.edit.ui()
    }

    const remove = () => {
        
    }

    const ui = () => {
        return (
            <ul className='full bxs flx-vc flx-sb pd-10 bg-c00101 bdr-1 bdr-c00104 bdr-tn bdr-rn bdr-ln' data-comp-hh="_actions">
                <li className='flx-vc'>
                    {expend()}
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