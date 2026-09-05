const siteprops = require('./siteprops');

const replace = (htm, key, val) => {
    return htm.replace(new RegExp(`__${key}__`, "g"), val);  
}

const replaceUrls = (req, res, html, sprops) => {
    if(sprops?.urls){
        for(const a in sprops.urls){
            html = replace(html, a, sprops.urls[a]);   
        }
    }
    return html;
}

const replaceAppProps = (req, res, html, sprops) => {
    const map = {
        gtmId:true,
        pathPrefix:true,
        staticsDir:true
    }

    if(sprops?.appProps){
        for(const a in map){
            if(sprops?.appProps[a]){
                html = replace(html, a, sprops?.appProps[a]);    
            }
        }
    }

    return html;
}

const htmlPlaceholders = async (html, req, res) => {
    const placeholders = req.helpers.json.val(req, 'appConfig.htmlPlaceholders', {});

    for(const a in placeholders){
        let item = placeholders[a];
        let val = req.helpers.json.val(req.appConfig, item.node);

        if(!val && item.fallback){
            val = item.fallback;
        }

        html = html.replace(new RegExp(a, "g"), val || ''); 
    }

    return html;
}

const set = async (req, res, html, flow) => {
    let sprops = await siteprops.get(req, res, flow);
    let plcHldr = req.helpers.json.val(req, 'appConfig.appConfig.chunksDomainPlaceholder', '__AIO__APP__CHUNKS__DOMAIN__PLACEHOLDER__');
        html = html.replace(/__RUN__TIME__SITEPROPS__/g, `${JSON.stringify(sprops)}`);
        html = replaceUrls(req, res, html, sprops);
        html = replaceAppProps(req, res, html, sprops);
        html = await htmlPlaceholders(html, req, res);
        html = html.replace(/__CHUNK__PLACEHOLDER__WILL__BE__REPLACE__HERE__/g, plcHldr);

    return html;
}

exports.set = set;