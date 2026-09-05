import helpers from 'ui-helpers';
import React, {useState, useEffect, useRef} from 'react';
import mhelpers from 'aio-app-ui-api-modules';
import SelectBox from 'aio-app-ui-atoms/select-box';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const [enums, setEnums] = useState({});

    const fristRender = helpers.react.state.frist(useRef(true), useEffect)();
    const valuemap = helpers.json.val(props, 'valuemap', '');
    const lastEnum = helpers.json.val(props, 'configs.ENUMS.LAST__ITEM__ENUM', '');
    const value = helpers.json.val(props, `validation.checks.enums.${valuemap === 'both'?'value':valuemap}`, '');

    const getEnumsList = () => {
        mhelpers.api.regexMapList.fetch.init(value, lastEnum, (resp) => {
            setEnums(resp);
        })
    };

    if(fristRender){
        getEnumsList();
    }

    const list = (() => {
        if(value){
            return value.split('.');
        }else{
            return ['6738829afbe779c7746626aa']
        }
    })();

    const options = (id) => {
        let rv = [];
        let opts = helpers.json.val(enums, id, {});

        for(const a in opts){
            rv.push(opts[a]);
        }

        return rv;
    };

    const onChangeCb = (arg) => {
        if(props.onChange){
            props.onChange({id:arg.join('.')});
        }
    }

    const enumApi = (mapId, listId, vmap) => {
        onChangeCb(vmap);
    }

    const getEnums = (vm) => {
        if(vm && vm.length > 0){
            let li = [...vm];
            let last = li.pop();
            let mapId = li.pop();
            enumApi(mapId, last, vm);
        }else{
            onChangeCb(vm) 
        }
    }

    const onSelect = (item, map) => {
        let vm = [...map];
        let id = helpers.json.val(item, 'id');
        let childs = helpers.json.val(item, 'hasChilds');
            vm.push(id);

            if(childs){
                vm.push(lastEnum);
                getEnums(vm);
            }else{
                onChangeCb(vm)
            }
    }

    const details = () => {
        if(list && list.length > 0){
            const map = [];
            return list.map((name, i) => {   
                let vm = [...map];
                    map.push(name);

                    return (
                        <li className='grid-w3 pd-r30 pd-b30' key={name+i}>
                            <SelectBox
                                noBlank={true}
                                list={options(name)}
                                selected={name || ''}
                                selectBoxProps={{
                                    label:'',
                                    onSelect:(e, item) => {
                                        onSelect(item, [...vm]);
                                    }
                                }}
                            />
                        </li>
                    )
            })
        }else{
            return <></>
        }
    }

    const ui = () => {
        return (
            <div className='full bxs grid-wrapper'>
                <ul className='full bxs grid-wrapper'>
                    <li className='grid-w1 pd-r30 pd-t10 nowrap bxs'>{props.type}</li>
                    <li className='grid-w10 bxs'>
                        <ul className='full bxs grid-wrapper'>
                            {details()}
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }

    return ui();
}

export default Comp;