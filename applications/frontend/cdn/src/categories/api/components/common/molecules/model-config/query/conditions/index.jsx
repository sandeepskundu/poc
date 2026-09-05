
import React from 'react';
import helpers from 'ui-helpers';
import Toggle from 'aio-global-ui/atoms/form/toggle';
import SelectBox from 'aio-app-ui-atoms/select-box';

const QueryDetailsInputs = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(10);
    const query = helpers.json.val(props, 'query', {});
    const conditions = helpers.json.val(props, 'configs.model.query.operations.list', {});
    const likeOptions = helpers.json.val(props, 'configs.model.query.operations.like', {});

    const list = (() => {
        const rval = [];

        for(const a in conditions){
            rval.push(conditions[a]);
        }

        return rval;
    })();
    
    const onChange = (arg) => {
        if(props.onChange){
            props.onChange(arg, props.map);
        }
    }

    const onToggle = (checked, arg) => {
        const qury = helpers.json.copy(query);
        const id = helpers.json.val(arg, 'id');
        const ops = helpers.json.val(query, 'operation', {});

        if(checked){
            const val = helpers.json.val(arg, 'value');

            if(val){
                ops[id] = {...{enable:true}, ...val};
            }
        }else{
            delete ops[id];
        }

        qury.operation = ops;
        onChange(query);
    }

    const enabled = (arg) => {
        const id = helpers.json.val(arg, 'id')
        return helpers.json.val(query, `operation.${id}.enable`);
    }

    const onSelect = (parent, child) => {
        let sel = helpers.json.copy(parent);
        let pval = helpers.json.val(parent, 'value', {});
        let cval = helpers.json.val(child, 'value', {});
            sel.value = helpers.json.merge(pval, cval);
            onToggle(true, sel);
    }

    const subOptions = (arg) => {
        const active = enabled(arg);
        const id = helpers.json.val(arg, 'id');

        if(active && id === 'regex'){
            return (
                <SelectBox
                    noBlank={true}
                    list={likeOptions}
                    selected={helpers.json.val(query, `operation.${id}.regexType`)}
                    selectBoxProps={{
                        label:'',
                        onSelect:(e, item) => {
                            onSelect(arg, item);
                        }
                    }}
                />
            )
        }else{
            return <></>
        }
    }

    const ui = () => {
        if(list && list.length > 0){
            return list.map((arg, i) => {
                return (
                    <div className='bxs pd-tb10 grid-wrapper' key={id+i}>
                        <div className='grid-w2 bxs'>
                            <Toggle 
                                label={arg.label}
                                checked={enabled(arg)}
                                onChange={(checked) => {
                                    onToggle(checked, arg);
                                }}
                            />
                        </div>
                        <div className='grid-w10'>
                            {subOptions(arg)}
                        </div>
                    </div>
                )
            })
        }else{
            return <></>
        }
    }

    return ui();
}

export default QueryDetailsInputs;