import helpers from 'ui-helpers';
import appHelpers from 'app-helpers';
import {useState, useEffect, useRef} from 'react';
import SelectBox from 'aio-app-ui-atoms/select-box';


const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const [enums, setEnums] = useState({});

    let valuemap = helpers.json.val(props, 'valuemap', '');
    let fristRender = helpers.react.state.frist(useRef(true), useEffect)();
    let lastEnum = helpers.json.val(props, 'configs.ENUMS.LAST__ITEM__ENUM', '');

    const list = (() => {
        if(valuemap){
            return valuemap.split('.');
        }else{
            return []
        }
    })();

    const root = () => {
        return {
            name:'rootMasterData',
            request:{
                cache:{
                    basedOn:{
                        url:true,
                        data:true,
                        method:true,
                        params:true
                    }
                },
                responseDataMap:{
                    "to":"0",
                }
            }
        }
    }

    const req = (id, index) => {
        return {
            name:'masterDataByParentHashId',
            request:{
                cache:{
                    basedOn:{
                        url:true,
                        data:true,
                        method:true,
                        params:true
                    }
                },
                request:{
                    params:{
                        id:id
                    }
                },
                responseDataMap:{
                    "to":`${index+1}`,
                }
            }   
        }
    }

    const apiList = (li) => {
        let rv = [root()];
        if(li && li.length > 0){
            for(const a in li){
                let id = li[a];
                if(id != lastEnum){
                    rv.push(req(id, parseInt(a))); 
                }
            }
        }
    
        return rv;
    }
    
    const getItem = (arg) => { 
        return {
            "id":helpers.json.val(arg, 'hashId', ''),
            "label":helpers.json.val(arg, 'name', ''),
            "hasChilds":helpers.json.val(arg, 'hasChilds', false)
        }
    }
    
    const parseResp = (resp) => {
        let rval = {};
        let res = resp || {};
        
        for(const a in res){
            let li = {};
            let list = res[a] || [];

            if(list.length > 0){
                for(const b in list){
                    li[b] = getItem(list[b]);
                }
            };

            rval[a] = li;
        }
            
        setEnums(rval);
    }
    
    const getMapData = (maplist, callOnChange) => {
        appHelpers.store.get(apiList(maplist), (resp) => {
            parseResp(resp);
            if(callOnChange){
                onChangeCb(maplist);
            }
        });
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
            <ul className='full bxs grid-wrapper'>
                {details()}
            </ul>
        )
    }

    return ui();
}

export default Comp;