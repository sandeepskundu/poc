import { useState} from 'react';
import helpers from 'ui-helpers';
import { SketchPicker } from 'react-color'

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);
    
    let timer = null;

    const data = helpers.json.val(props, 'data', {});
    const mapping = helpers.json.val(props, 'mapping', []);
    
    const apicker = helpers.json.val(props, 'details.ative.picker', '');
    const editable = helpers.json.val(props, 'details.ative.editable', false);
    const theme = helpers.json.val(props, 'details.data.theme.modified', {});

    const map = (() => {
        return `${mapping.join('.')}.hex`;
    })();

    const hex = (() => {
        return helpers.json.val(theme, map, 'NA')
    })();

    const [picker, setPicker] = useState({
        show:false,
        color: {
            hex:hex
        }
    })

    const toggle = (name) => {
       if(editable && props.onPickerToggle){
            props.onPickerToggle(name)
       }
    };

    const onChange = (color) => {
        onComplete(color)
        let d = helpers.json.copy(picker);
            d.color = color;
            setPicker(d);
            
    };

    const onComplete = (color) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            if(props.onChange){
                props.onChange(color.hex, map)
            }
        }, 10);
    }

    const pickerUi = (code) => {
        if(editable && code === apicker){
            return (
                <>
                    <div style={{zIndex:'998', position:'fixed', top:'0px', right:'0px', bottom:'0px', left:'0px'}} onClick={() => {toggle('')}}></div>
                    <div className='lyr aln-rb _aln-bl' style={{zIndex:'999', width:'220px', height:'45px'}}>
                        <SketchPicker color={picker.color } hex="#f0f0ff" onChange={onChange} />
                    </div>
                </>
            )
        }else{
            return <></>
        }
    }

    const bg = () => {
        if(hex === 'NA'){
            return {
                'background':`url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADFJREFUOE9jZGBgEGHAD97gk2YcNYBhmIQBgWSAP52AwoAQwJvQRg1gACckQoC2gQgAIF8IscwEtKYAAAAASUVORK5CYII=")`
            }
        }else{
            return {
                'background':`${hex}`
            };
        }
    }

    const ui = () => {
        return (
            <div className='full bxs shdw-sm bdr-6 pr'>
                <div className={`bxs txt-12 ac pd-tb10 bdr-t4 full cp ac ns _bg-${data.vname}`} onClick={() => {toggle(data.vname)}} style={bg()}>{data.vname}</div>
                <div className='full bg-c00000 bxs bdr-b4'>
                    <p className='full bxs txt-10 pd-8 pd-bn fm-md ac'>{data.code}</p>
                    <p className='full bxs txt-10 pd-tb8 ac'>{hex}</p>
                </div>
                {pickerUi(data.vname)}
            </div>
        )
    }

    return ui()
}

export default Comp;