const getDevice = () => {
    let width = window.innerWidth;
    let ua = navigator.userAgent;
    let mtp = navigator.maxTouchPoints;
    let adlua = 'AdaniOne App iOS/Android - QWRhbmlPbmUgQXBwIGlPUy9BbmRyb2lk';

    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    else if(/(Safari|Macintosh)/i.test(ua) && width > 768 && width < 1367 && mtp > 0){
        return "tablet";
    }
    else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "mobile";
    }

    if(width < 1024 && width > 768){
        return 'tablet'
    }

    if(width < 768){
        return 'mobile';
    }

    if(adlua === ua){
        return 'mobile';
    }

    return "desktop";
}

const deviceObj = () => {
    let view = getView();

    let rval = {
        current:view,
        tablet:false,
        mobile:false,
        desktop:false,
    }

    rval[view] = true;

    return rval;
}


const getView = () => {
    return getDevice();
}

const channel = () => {
    let map = {
        'mobile':'Web',
        'desktop':'Web',
        'tablet':'Web',
    }
    let view = getView();

    if(map[view]){
        return map[view];
    }else{
        return map.desktop;
    }
}

const is = (type) => {
    let is = getDevice();
    return (is === type);
}

exports.is = is;
exports.channel = channel;
exports.getView = getView;
exports.deviceObj = deviceObj;
exports.getDevice = getDevice;