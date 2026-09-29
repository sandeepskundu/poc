const Comp = (props) => { 
    const details = props.props;

    const node = details.node;
    const editor = props.__ || {};

    const isType = (type, parent) => {
        return details.builder.isDataType(parent || node.__.type, type);
    }

    const key = () => {
        if(!isType('array', details.parentType)){
            return (
                <div className='grid pd-r16 bxs'>
                    {editor.templates.node.key()}
                </div>
            )
        }
    }

    const metaItem = (meta) => {
        return (
            <ul className="full bxs pd-tb24 grid-wrapper grid-layout-2">
                <li className="grid pd-r16 bxs">{editor.templates.meta.key(meta)}</li>
                <li className="grid pd-l16 bxs">{editor.templates.meta.value(meta, 'value')}</li>
            </ul>
        )
    }

    const metalist = () => {
        let metas = node?.__?.metas || [];

        if(metas.length > 0){
            return metas.map((meta) => {
                return (
                    <React.Fragment key={meta.id}>
                        {metaItem(meta)}
                    </React.Fragment>
                )
            })
        }
    }

    const ui = () => {
        if(node.__.editing){
            return (
                <div className='full bxs grid-wrapper grid-layout-2 pd-rl16 pd-tb30'>
                    {key()}
                    <div className='grid pd-l16 bxs'>
                        {editor.templates.node.type()}
                    </div>
                    <ul className='full pd-tb18'>
                        <li className='fl'>
                            {editor.templates.node.nullable()}
                        </li>
                    </ul>
                    <div className="full bxs">
                        {metalist()}
                    </div>
                </div>
            )
        }
    }

    return ui();
}

export default Comp;