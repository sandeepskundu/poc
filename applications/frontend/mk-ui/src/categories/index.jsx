
    import App from './app';
    import * as React from "react";
    import * as ReactDOM from "react-dom/client";
    import h from 'ui-helpers';
    import req from 'aio-ui-libs/helpers/request';
    
    const ADLAPP = () => {
        let org = __webpack_get_script_filename__;
        let pPath = __webpack_require__.p;
        let cdnBase = helpers.json.val(_siteProps_, 'appProps.chunksDomainPlaceholder', '/');
        let plchldrKey = helpers.json.val(_siteProps_, 'appProps.chunksDomainPlaceholderKey', '__AIO__APP__CHUNKS__DOMAIN__PLACEHOLDER__');
            __webpack_require__.p = pPath.replace(new RegExp(plchldrKey, "g"), cdnBase);
            __webpack_get_script_filename__ = (cId) => { 
                return org(cId);   
                //return _$_{fn}?languageId=llslsls
            }
    
        return <App />
    }
    
    console.log(h);
    h.request = req;
    h.react = h.react || {};
    h.react.utils = React;
    h.inital.init(false, h);
    
    const elm = document.getElementById("apId1nfb8xa7");
    const root = ReactDOM.createRoot(elm);
    root.render(<ADLAPP />);