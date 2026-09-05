
import helpers from 'ui-helpers';
import {useState, useEffect} from 'react';
import mhelper from 'aio-app-ui-tdc-ds-modules';
import DsThemeColorList from 'aio-app-ui-tdc-ds-organisms/ds-theme-color-list';
import DsThemeColorHeader from 'aio-app-ui-tdc-ds-organisms/ds-theme-color-header';

const DESKTOPSRP = (propsny) => {

    const [fresh, setFresh] = useState(true);
    const [details, setDetails] = useState({
        blank:true,
        data:{
            theme:{
                modified:{},
                original:{}
            }
        },
        ative:{
            picker:'',
            editable:true
        },
        
    });

    const onResponse = (resp) => {
        let d = helpers.json.copy(details);
        let action = helpers.json.val(_siteProps_, 'router.params.action', 'create');
            d.blank = false;
            d.data = helpers.json.merge((d.data || {}), (resp || {}));

            if(action != 'create'){
                mhelper.api.themeByHashId.init((res) => {
                    d.data = helpers.json.merge((d.data || {}), (res || {}));
                    setDetails(d);
                });
            }else{
                setDetails(d);
            }
    }

    if(fresh){
        setFresh(false);
        mhelper.api.rootTheme.init(onResponse);
    }

    useEffect(() => {
        console.log(details);
    }, [details]);

    const onPickerToggle = (code) => {
        let m = 'ative.picker';
        let d = helpers.json.copy(details);
        let a = helpers.json.val(details, m);

        if(a === code){
            d = helpers.json.set(d, m, '', false, true);
        }else{
            d = helpers.json.set(d, m, code, false, true);
        }
        setDetails(d);
    }

    const onChange = (arg, map) => {
        let d = helpers.json.copy(details);
            d = helpers.json.set(d, `data.theme.modified.${map}`, arg, false, true);
            setDetails(d);
    }

    const onDetailsChange = (val, map) => {
        let d = helpers.json.copy(details);
            d = helpers.json.set(d, map, val, false, true);
            setDetails(d);
    }

    return (
        <>
            <DsThemeColorHeader details={details} onDetailsChange={onDetailsChange} />
            <DsThemeColorList details={details} onPickerToggle={onPickerToggle} onChange={onChange} />
        </>
    )
}

export default DESKTOPSRP;