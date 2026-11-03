import helpers from 'ui-helpers';
import appHelpers from 'app-helpers';
import {useEffect, useState, useRef} from "react";
import DocProps from 'aio-app-ui-developer-molecules/story-document-props';
import DocPreview from 'aio-app-ui-developer-molecules/story-component-preview';
import DocDescription from 'aio-app-ui-developer-molecules/story-document-description';

const Comp = (props) => {
    const hash = helpers.json.get(_siteProps_, 'router.params.hash', '');

    const [details, setDetails] = useState({
        data:{},
        blank:true
    });

    const onResp = (resp, arg) => {
        let d = helpers.json.copy(details);
            d = helpers.json.merge(d, resp);
            d.original = helpers.json.copy(d.data || {});
            d.blank = false;
            setDetails({...d});
    }

    helpers.react.hooks.onmount(useRef(false), useEffect, () => {
        appHelpers.store.get([{
            name:'storybook.document.details',
            request:{
                options:{},
                request:{
                    method:'get',
                    params:{
                        hash:hash
                    }
                }
            }
        }], onResp);
    });

    const defProps = (() => {
        let dprops = helpers.json.get(details, 'data.props.default', {});
        let rval = helpers.json.get(details, 'data.storybook.details.mockdata.defaults', {});
        return helpers.json.merge(dprops, rval);
    })();

    const docPreview = (name, arg) => {
        if(arg && helpers.data.type.is(arg, 'object')){
            return (
                <DocPreview 
                    {...details} 
                    preview={{
                        name:name,
                        props:{...arg}
                    }} 
                />
            )
        }else{
            return <></>
        }
    }

    const defaultPreview = () => {
        return docPreview('base', defProps);
    }

    const previews = () => {
        const variants = helpers.json.get(details, 'data.storybook.details.mockdata.variants', {});

        if(variants && helpers.data.type.is(variants, 'object') && helpers.json.length(variants) > 0){
            let li = helpers.json.keys(variants);

            return li.map((name, i) => {
                let val = helpers.json.get(variants, name, {});
                    val = helpers.json.merge(defProps, val);

                if(val && helpers.data.type.is(val, 'object') && helpers.json.length(val) > 0){
                    return (
                        <React.Fragment key={`${hash}${i}`}>
                            {docPreview(name, val)}
                        </React.Fragment>
                    )
                }else{
                    return <React.Fragment key={`${hash}${i}`}></React.Fragment>
                }
            });
        }
    }

    return (
        <div className='full'>
            <DocDescription {...details} />
            {defaultPreview()}
            {previews()}
            <DocProps {...details} />
        </div>
    )
}

export default Comp;