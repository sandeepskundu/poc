import helpers from 'ui-helpers';
import Highlighter from 'aio-global-raw-ui/atoms/typography/highlighter';

const Comp = (details) => {
    const props = details.props;
    const node = details.props.node;

    const isType = (type, parent) => {
        return props.builder.isDataType(parent || node.__.type, type);
    }

    const isObjOrArray = () => {
        return (isType('object') || isType('array'));
    }

    const childCount = () => {
        if(isObjOrArray()){
            return <span className='txt-xxs txt-c00105 pd-tb2 pd-rl6 bdr-2 mr-l2'>({node.__.children.length} {isType('array')? 'items' : 'props'})</span>   
        }
    }

    const expend = () => {
        if(isObjOrArray(props.node)){
            return <span className={`mr-r8 ico-14 cp ico-g-${node.__.expanded?'minus':'plus'}`} data-tip-html={node.__.expanded?'Collapse':'Expend'}  onClick={() => details.__.callbacks.node.expend()} />
        }
    }

    const highlight = () => {
        if(isType('array', props.parentType)){
            return `[${props.index}]`
        };

        if(node.__.key){
            if(node._offsets){
                return (
                    <Highlighter 
                        text={node.__.key}
                        offsets={node._offsets['__.key']}
                    />
                )
            }else{
                return node.__.key;
            }
        }else{
            return '<unnamed_key>'
        }
    }

    const error = () => {
        const hasEmptyError = !isType('array', props.parentType) && (!node.__.key || !node.__.key.trim());
        const hasDuplicateError = !isType('array', props.parentType) && props.isKeyDuplicate(props.entireTree, node.__.id, node.__.key);
        const hasError = hasDuplicateError || hasEmptyError;

        if(hasError){
            return <span className='txt-xxs txt-c00306 mr-l8'>⚠️ {hasDuplicateError?'(Duplicate)':'(Key required'}</span>
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
        if(isObjOrArray(node)){
            return <span className={`mr-l16 ico-14 cp ico-g-plus`} data-comp-hd-target="actions" data-tip-html="Add" onClick={() => {details.__.callbacks.node.addNew()}} />
        }
    }

    const modify = () => {
        if(node.__.editing){
            return <span className={`mr-l16 ico-14 cp ico-g-check`} data-tip-html="Done" onClick={() => {details.__.callbacks.node.edit()}} />
        }else{
            return <span className={`mr-l16 ico-14 cp ico-g-edit`} data-comp-hd-target="actions" data-tip-html="Edit" onClick={() => {details.__.callbacks.node.edit()}} />
        }
    }

    const remove = () => {
        return <span className={`mr-l16 ico-14 cp ico-g-delete`} data-comp-hh-target="actions" data-tip-html="Delete" onClick={() => {details.__.callbacks.node.delete()}} />
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

    return ui()
}

export default Comp;