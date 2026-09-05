const map = {
    status:require('./status'),
    resendAt:require('./resend-at'),
    validTill:require('./valid-till')
}

const beforCreate = async (data, req, res) => {
    let order = ['resendAt', 'validTill', 'status'];
    let rval = {
        valid:true,
        validation:{}
    }
    
    for(const a in order){
        let name = order[a];

        if(map && map[name] && map[name].start){
            rval = await map[name].start(data, req, res);
        }

        if(rval && rval.valid === false){
            break;
        }
    }

    return rval;
}

exports.beforCreate = beforCreate;