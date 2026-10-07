import helpers from 'ui-helpers';
import Highlighter from 'aio-global-raw-ui/atoms/typography/highlighter';

const Comp = (details) => {
    const props = details.props;
    const node = details.props.node;
    const editor = details.props.__ || {};

    const getTemplate = (map) => {
        let rval =  helpers.json.get(details, map, null);

        if(rval && helpers.data.type.is(rval, 'function')){
            return rval;
        }

        return null;   
    }

    const layoutTemplate = getTemplate('templates.layout');

    const isType = (type, parent) => {
        return props.builder.isDataType(parent || node.__.type, type);
    }

    const isObjOrArray = (() => {
        return (isType('object') || isType('array'));
    })();

    const childCountLabel = () => {
        return (isObjOrArray && node.__.children?(`${node.__.children.length} ${isType('array')? 'items' : 'props'}`):'');
    }

    const childCount = () => {
        if(isObjOrArray){
            return <span className='txt-xxs txt-c00105 pd-tb2 pd-rl6 bdr-2 mr-l2'>{childCountLabel()}</span>   
        }
    }

    const hasEmptyError = (!isType('array', props.parentType) && (!node.__.key || !node.__.key.trim()));
    const hasDuplicateError = (!isType('array', props.parentType) && props.isKeyDuplicate(props.entireTree, node.__.id, node.__.key));
    const hasError = (hasDuplicateError || hasEmptyError);

    const callbacks = {
        edit:details.__.callbacks.node.edit,
        addNew:details.__.callbacks.node.addNew,
        remove:details.__.callbacks.node.delete,
        expend:details.__.callbacks.node.expend
    }

    const expend = () => {
        if(isObjOrArray){
            return <span className={`mr-r8 ico-14 cp ico-g-${node.__.expanded?'minus':'plus'}`} data-tip-html={node.__.expanded?'Collapse':'Expend'}  onClick={() => callbacks.expend()} />
        }
    }

    const highlighter = (arg) => {
        return (
            <Highlighter 
                {...(arg || {})}
                text={node.__.key}
                offsets={node._offsets['__.key']}
            />
        )
    }

    const highlight = (noHighlight) => {
        if(isType('array', props.parentType)){
            return `[${props.index}]`
        };

        if(node.__.key){
            if(node._offsets && !noHighlight){
                return highlighter();
            }else{
                return node.__.key;
            }
        }else{
            return '<unnamed_key>'
        }
    }

    const errorLabel = () => {
        return (hasError?(`⚠️ ${hasDuplicateError?'(Duplicate)':'(Key required)'}`):'');
    }

    const error = () => {
        if(hasError){
            return <span className='txt-xxs txt-c00306 mr-l8'>{errorLabel()}</span>
        }
    }

    const label = () => {
        return (
            <>
                <span className='txt-12 fm-md'>{highlight()}</span>
                {error()}
            </>
        )
    }

    const addIcon = () => {
        if(isObjOrArray){
            return <span className={`mr-l16 ico-14 cp ico-g-plus`} data-comp-hd-target="actions" data-tip-html="Add" onClick={() => {callbacks.addNew()}} />
        }
    }

    const modify = () => {
        if(node.__.editing){
            return <span className={`mr-l16 ico-14 cp ico-g-check`} data-tip-html="Done" onClick={() => {callbacks.edit()}} />
        }else{
            return <span className={`mr-l16 ico-14 cp ico-g-edit`} data-comp-hd-target="actions" data-tip-html="Edit" onClick={() => {callbacks.edit()}} />
        }
    }

    const remove = () => {
        return <span className={`mr-l16 ico-14 cp ico-g-delete`} data-comp-hh-target="actions" data-tip-html="Delete" onClick={() => {callbacks.remove()}} />
    }

    const layout = () => {
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

    const ui = () => {
        if(layoutTemplate){
            return layoutTemplate({
                layout:{
                    ui:layout
                },
                actions:{
                    expend:{
                        ui:expend,
                        show:isObjOrArray,
                        state:node.__.expanded,
                        method:callbacks.expend
                    },
                    edit:{
                        ui:modify,
                        state:node.__.editing,
                        method:callbacks.edit
                    },
                    remove:{
                        ui:remove,
                        method:callbacks.remove
                    },
                    add:{
                        ui:addIcon,
                        show:isObjOrArray,
                        method:callbacks.addNew
                    }
                },
                count:{
                    ui:childCount,
                    show:isObjOrArray,
                    text:childCountLabel()
                },
                label:{
                    ui:label,
                    text:highlight(true),
                    withHighlight:highlight,
                    highlighter:highlighter,
                    error:{
                        ui:error,
                        label:errorLabel(),
                        state:{
                            show:hasError,
                            empty:hasEmptyError,
                            duplicate:hasDuplicateError
                        }
                    }
                }
            }, {
                node:node,
                editor:editor
            });
        }else{
            return layout();
        }
        
    }

    return ui()
}

export default Comp;