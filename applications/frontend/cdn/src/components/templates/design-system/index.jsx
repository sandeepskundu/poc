import {units} from './units';
import helpers from 'ui-helpers';
import Space from 'aio-app-ui-atoms/design-system/space';
import Flags from 'aio-app-ui-atoms/design-system/flags';
import React, {useEffect, useState, useRef} from 'react';
import ThemeDs from 'aio-app-ui-organisms/design-system/theme';
import FontSize from 'aio-app-ui-atoms/design-system/font-size';
import Animation from 'aio-app-ui-atoms/design-system/animations';
import FontFamily from 'aio-app-ui-atoms/design-system/font-family';
import BorderNone from 'aio-app-ui-atoms/design-system/border-none';
import ShadowSize from 'aio-app-ui-atoms/design-system/shadow-size';
import BorderRadius from 'aio-app-ui-atoms/design-system/border-radius';

const DesignSystem = (props) => {
    const [ds, setDs] = useState(props.dsProps);
    const fristRender = helpers.react.state.frist(useRef(true), useEffect)();

    useEffect(() => {
        setDs(props.dsProps);
    }, [props.dsProps]);  

    useEffect(() => {
        if(!fristRender){
            console.log(JSON.stringify(ds));
            console.log(ds, 'Update');
        }
    }, [ds]);  

    // Blank Value map
    const bvmap = {
        1:'ds.theme.colorPairing.default',
        2:'ds.theme.colorPairing.hover',
        3:'ds.theme.background.default',
        4:'ds.theme.background.hover',
        5:'ds.theme.text.default',
        6:'ds.theme.text.hover',
        7:'ds.theme.border.default',
        8:'ds.theme.border.hover',
        9:'ds.css.class.shadow',
        10:'ds.css.class.family',
        11:'ds.css.class.fontsize',
        12:'ds.css.class.borderNone.1',
        13:'ds.css.class.borderNone.2',
        14:'ds.css.class.borderNone.3',
        15:'ds.css.class.borderNone.4',
        16:'ds.css.flags.noBorder',
        17:'ds.css.flags.rounded',
        18:'ds.css.flags.disabled',
        19:'ds.css.flags.isDisplay',
        20:'ds.css.flags.boxSizing',
        21:'ds.css.flags.animation',
        22:'ds.css.flags.noRadius',
        23:'ds.css.others'
    }

    // Zero value map
    const zvmap = {
        1:'ds.css.class.radius.1',
        2:'ds.css.class.radius.2',
        3:'ds.css.class.radius.3',
        4:'ds.css.class.radius.4',
        5:'ds.css.class.padding.1',
        6:'ds.css.class.padding.2',
        7:'ds.css.class.padding.3',
        8:'ds.css.class.padding.4',
        9:'ds.css.class.margin.1',
        10:'ds.css.class.margin.2',
        11:'ds.css.class.margin.3',
        12:'ds.css.class.margin.4'
    }

    const allzero = (rv) => {
        let cls = helpers.json.val(rv, 'ds.css.class', {});
        let clsl = helpers.json.length(cls);

        const zvmap = {
            "margin":true,
            "radius":true,
            "padding":true
        }

        if(clsl > 0){
            for(const a in zvmap){
                let mval = {};
                let has = false;
                let index = {
                    1:true,
                    2:true,
                    3:true,
                    4:true
                };
    
                if(cls[a]){
                    for(const b in index){
                        let iv = helpers.json.val(cls[a], b);
                        if(iv != 0 && iv != '0'){
                            has = true;
                            mval = cls[a];
                        }
    
                        if(has){
                            break;
                        }
                    }
    
                    if(!has){
                        delete cls[a];
                    }
                }
            }
        }

        clsl = helpers.json.length(cls);

        if(clsl > 0){
            rv.ds = rv.ds || {};
            rv.ds.css = rv.ds.css || {};
            rv.ds.css.class = cls;
        }

        return rv;
    }

    const onChange = (values, map) => {
        let rv = {};
        let d = helpers.json.copy(ds);
            d = helpers.json.set(d, map, false, false, true);
            d = helpers.json.set(d, map, values, false, true);

        for(const a in bvmap){
            const m = bvmap[a];
            const v = helpers.json.val(d, m);

            if(v){
                rv = helpers.json.set(rv, m, v, false, true); 
            }
        };

        for(const a in zvmap){
            const m = zvmap[a];
            const v = helpers.json.val(d, m);

            if(v || v == 0){
                rv = helpers.json.set(rv, m, v, false, true); 
            }
        };

        rv = allzero(rv);

        
        let cssl = helpers.json.length(helpers.json.val(rv, 'ds.css', {}));
        let thl = helpers.json.length(helpers.json.val(rv, 'ds.theme', {}));

        if(cssl === 0){
            rv.ds = rv.ds || {};
            delete rv.ds.css;
        }

        if(thl === 0){
            rv.ds = rv.ds || {};
            delete rv.ds.theme;
        }
        
        setDs({...d, ...rv});
    }

    const ui = () => {
        const layout = helpers.json.val(props, 'layout');
        return (
            <>
                <div className='full bxs'>
                    <ThemeDs
                        dsProps={ds}
                        dsData={units}
                        onChange={onChange}
                        layout={props.layout}
                    />
                </div>
                <div className={`full ${layout === 'page'?'grid-wrapper grid-layout-6':''}`}>
                    <div className={`bxs ${layout === 'page'?'grid pd-r16':'full'}`}>
                        <Space 
                            dsProps={ds}
                            type="margin"
                            dsData={units}
                            onChange={onChange}
                            layout={props.layout}
                        />
                    </div>
                    <div className={`bxs ${layout === 'page'?'grid pd-r16':'full'}`}>
                        <Space 
                            dsProps={ds}
                            type="padding"
                            dsData={units}
                            onChange={onChange}
                            layout={props.layout}
                        />
                    </div>
                    <div className={`bxs ${layout === 'page'?'grid pd-r16':'full'}`}>
                        <BorderRadius 
                            dsProps={ds}
                            dsData={units} 
                            onChange={onChange}
                            layout={props.layout}
                        />
                    </div>
                    <div className={`bxs pd-t6 ${layout === 'page'?'grid pd-r16':'full'}`}>
                        {layout === 'page'?<p class="full fm-sb pd-t18">Other Props</p>:<></>}
                        <div className='full bxs pd-t24'>
                            <FontSize 
                                dsProps={ds}
                                dsData={units} 
                                onChange={onChange}
                                layout={props.layout}
                            />
                        </div>
                        <div className='full bxs pd-t24'>
                            <FontFamily 
                                dsProps={ds}
                                dsData={units} 
                                onChange={onChange}
                                layout={props.layout}
                            />
                        </div>
                        <div className='full bxs pd-t24'>
                            <Animation 
                                dsProps={ds}
                                dsData={units} 
                                onChange={onChange}
                                layout={props.layout}
                            />
                        </div>
                        <div className='full bxs pd-t24'>
                            <ShadowSize
                                dsProps={ds}
                                dsData={units} 
                                onChange={onChange}
                                layout={props.layout}
                            />
                        </div>
                    </div>
                    {
                        (layout === 'page')?(
                            <>
                                <div className='grid pd-r16 pd-l16 bxs pd-t24'>
                                    <Flags 
                                        dsProps={ds}
                                        dsData={units} 
                                        onChange={onChange}
                                        layout={props.layout}
                                    />
                                </div>
                                <div className='grid bxs pd-t24'>
                                    <BorderNone
                                        dsProps={ds}
                                        dsData={units} 
                                        onChange={onChange}
                                        layout={props.layout}
                                    />
                                </div>
                            </>
                        ):(
                            <div className='full bxs '>
                                <div className='full bxs pd-t24'>
                                    <Flags 
                                        dsProps={ds}
                                        dsData={units} 
                                        onChange={onChange}
                                        layout={props.layout}
                                    />
                                </div>
                                <div className='full bxs pd-t24'>
                                    <BorderNone
                                        dsProps={ds}
                                        dsData={units} 
                                        onChange={onChange}
                                        layout={props.layout}
                                    />
                                </div>
                            </div>
                        )
                    }
                </div>
            </>
        )
    }

    return ui();
}

export default DesignSystem;