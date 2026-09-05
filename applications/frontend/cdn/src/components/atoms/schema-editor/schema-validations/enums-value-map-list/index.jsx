import helpers from 'ui-helpers';
import React, {useState, useEffect, useRef} from 'react';
import mhelpers from 'aio-app-ui-api-modules';
import SelectBox from 'aio-app-ui-atoms/select-box';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const [enums, setEnums] = useState({});

    let lastEnum = '__LAST__ITEM__ENUM__';
    let valuemap = helpers.json.val(props, 'valuemap', '');
    let fristRender = helpers.react.state.frist(useRef(true), useEffect)();

    const list = (() => {
        if(valuemap){
            return valuemap.split('.');
        }else{
            return []
        }
    })();

    const req = (id) => {
        return {
            cache:{
                basedOn:{
                    url:true,
                    data:true,
                    method:true,
                    params:true
                }
            },
            request:{
                data:{},
                params:{
                    id:id
                },
                headers:{},
                method:'get',
                url:'http://localhost:1300/cdn/gUtilsApi/health',
            }
        }
    }
    
    const apiList = (li) => {
        let rv = [req('6738829afbe7d79c7746626a')];
        if(li && li.length > 0){
            for(const a in li){
                let id = li[a];
                if(id != lastEnum){
                    rv.push(req(id)); 
                }
            }
        }
    
        return rv;
    }
    
    const getItem = (label, id) => { 
        return {
            "id":id,
            "label":label,
            "hasChilds":true
        }
    }
    
    const parseResp = (res) => {
        let rval = {};
    
        if(res && res.length > 0){
            for(const a in res){
                let li = {};
                let item = res[a];
                let id = helpers.json.val(item, 'config.request.params.id');
                    id = helpers.crpt.md5('ldld')


                for(let b = 0 ; b < (parseInt(a)+10); b++){
                    if(b === 0 || b === '0' && (a === 0 && a === '0')){
                        li[b] = getItem(`${parseInt(a)+1} > ${b}`, id);
                    }else{
                        li[b] = getItem(`${parseInt(a)+1} > ${b}`, `${id+a+b}`);
                    }
                }
                rval[a] = li;
            }
        }
            
        setEnums(rval);
    }
    
    const getMapData = (maplist, callOnChange) => {
        let li = apiList(maplist);
        if(li && li.length > 0){
            helpers.request.ui.list.get(li, (resp) => {
                parseResp(resp);

                if(callOnChange){
                    onChangeCb(maplist);
                }
            });
        }
    }

    if(fristRender){
        getMapData(list);
    }

    const options = (index) => {
        let rv = [];
        let opts = helpers.json.val(enums, `${index}`, {});

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

    const getEnums = (vm) => {
        if(vm && vm.length > 0){
            getMapData([...vm], true);
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
                            list={options(i)}
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
            return (
                <li className='grid-w3 pd-r30 pd-b30'>
                    <SelectBox
                        noBlank={true}
                        list={options(0)}
                        selected={''}
                        selectBoxProps={{
                            label:'',
                            onSelect:(e, item) => {
                                onSelect(item, []);
                            }
                        }}
                    />
                </li>
            )
        }
    }

    const ui = () => {
        return (
            <div className='full bxs grid-wrapper'>
                <ul className='full bxs grid-wrapper'>
                    {details()}
                </ul>
            </div>
        )
    }

    return ui();
}

export default Comp;