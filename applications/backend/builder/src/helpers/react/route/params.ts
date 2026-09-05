const params = {
    getIgnoreVal(){
        return 'x';
    },
    url(route:any, url:any){
        if(route.path){
            if(route.path.base){
                url = route.path.base;
            }

            if(route.path.params){
                url = route.path.params;
            }
        }
        return url;
    },
    mergeWithPath(arg?:any, conf?:any){
        let url = false;
        let index:any = false;
        let params:any = this.merge(arg);
        let route = (conf?conf:false);

        if(!route){
            route = window[_CN].json.val(_siteProps_, 'router.route')
        };

        if(route){
            url = this.url(route, url);
            if(route.pIndex){
                index = route.pIndex;
            }
        }

        if(url){
            for(let a in index){
                url = window[_CN].string.replace.word(url, (`#P${a}P#`), params[index[a]]);
            }
        }

        return url;
    },
   getRval(rval: any, reset: any, arg: any){
    let router = _siteProps_.router;
    let param = (router.params?router.params:{});
    let index = (router.route?.pIndex?router.route.pIndex:{});
        param = window[_CN].json.merge((param?param:{}), (arg?arg:{}));

    for(let a in index){
        if(reset){
            rval[index[a]] = this.getIgnoreVal();
        }else if(param[index[a]]){
            rval[index[a]] = param[index[a]];
        }else{
            rval[index[a]] = this.getIgnoreVal();
        }
    }
    return rval
   },
    merge(arg?:any, reset?:any){
        let rval:any = {};
        if(_siteProps_.router){
          rval = this.getRval(rval, reset, arg);  
        }
        
        return rval;
    },

    refresh(arg?:any){
       return this.merge(arg, true); 
    },

    refreshPath(arg?:any, conf?:any){
        arg = this.refresh(arg);
        return this.mergeWithPath(arg, conf);
    }
}

export default params;