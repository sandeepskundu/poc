const match = {
    param:{
        val(name?:any, val?:any){
            let rval = false;

            if(name && val){
                let pop = _val(_siteProps_, ('router.params.'+name));
                if(pop && (val === pop)){
                    return true;
                }
            }

            return rval;
        },

        enum(name?:any, enms?:any){
            let rval = false;

            if(name && enms && enms.length > 0){
                let pop = _val(_siteProps_, ('router.params.'+name));
                if(pop && enms.indexOf(pop) > -1){
                    return true;
                }
            }

            return rval;
        }
    },
    query:{
        val(name?:any, val?:any){
            let rval = false;

            if(name && val){
                let pop = _val(_siteProps_, ('router.query.'+name));
                if(pop && (val === pop)){
                    return true;
                }
            }

            return rval;
        },

        enum(name?:any, enms?:any){
            let rval = false;

            if(name && enms && enms.length > 0){
                let pop = _val(_siteProps_, ('router.query.'+name));
                if(pop && enms.indexOf(pop) > -1){
                    return true;
                }
            }

            return rval;
        }
    }
}

export default match;