exports.get = (req) => {
    if(req && req._siteProps_){
        return req._siteProps_;
    }else{
        return req || _siteProps_;
    }
}