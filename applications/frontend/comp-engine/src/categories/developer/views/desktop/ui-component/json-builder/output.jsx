import {useState} from 'react';
import helpers from 'ui-helpers';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops, helpers);

    const builder = props.builder;
    const [preview, setPreview] = useState(false);
    const [mode, setMode] = useState('definition');
    const [data, setData] = useState({
        json:{},
        valid:true
    });
    
    const update = (a) => {
        a.tree = helpers.json.copy(a.json || {});
        if (mode === 'definition') {
            a.json = builder.serializeDefinition(a.json, 'object');
        } else {
            a.json = builder.serializeEvaluatedData(a.json, 'object');
        };
        setData(a);
    }

    const togglePreviw = (arg) => {
        setPreview(arg.preview);
    }

    const bindEvent = (name, cb) => {
        helpers.react.hooks.event.off(name, cb);
        helpers.react.hooks.event.on(name, cb);
    }

    bindEvent(builder.id, update);
    bindEvent(builder.utils.eventNames.preview, togglePreviw);

    const valid = () => {
        if(data && data.valid){
            return (
                <span className='txt-xs txt-c00507 flx-vc'>
                    <span className='dib pd-4 bdr-round bg-c00507 mr-r8'></span>
                    <span className='dib'>Valid schema</span> 
                </span>
            )
        }else{
            return (
                <span className='txt-xs txt-c00307 flx-vc'>
                    <span className='dib pd-4 bdr-round bg-c00307 mr-r8'></span>
                    <span className='dib'>Invalid schema</span> 
                </span>
            )
        }
    }

    const changeMode = (type) => {
        setMode(type);
        let d = helpers.json.copy(data);
            d.json = d.tree || {};
            update(d);        
    }

    const modes = () => {
        return (
            <ul className='flx-vc txt-12 hide'>
                <li className='mr-r16' onClick={() => {changeMode('definition')}}>Definition</li>
                <li className='mr-r16' onClick={() => {changeMode('evaluated')}}>Evaluated JSON Data</li>
            </ul>
        )
    }

    const view = () => {
        if(data && data.valid){
            return (
                <pre>{JSON.stringify(data.json || {}, null, 4)}</pre>
            )
        }else{
            return <p className='full'>❌ Compilation Paused. Provide unique keys.</p>
        }
    }

    const ui = () => {
        if(preview){
            return (
                <div className='full bsx'>
                    <div className='full bxs pd-10 bdr-1 bdr-c00104 bdr-t8 bg-c00103 flx-sb flx-vc'>
                        <span className='dib txt-sm fm-md'>Schema Definition Output</span>
                        {valid()}
                        {modes()}
                    </div>
                    <div className='full bg-c00110 txt-c00000 pd-20 bdr-b8 bxs txt-xs' >
                        {view()}
                    </div>
                </div>
            )
        }else{
            return <></>
        }
    }

    return ui();
}

export default Comp;