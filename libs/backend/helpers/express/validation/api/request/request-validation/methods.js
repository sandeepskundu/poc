
const validate = (validation, req, res, next) => {
    let method = req.helpers.json.get(req, 'method');
        method = method.toLowerCase();

    const allowed = req.helpers.json.get(validation, `${method}.allowed`);

    if(allowed){
        return {
            valid:true,
            status:{
                code:200,
            },
            validation:{
                valid:true,
                error:false,
                message:req.helpers.json.get(validation, `${method}.message.success`)
            }
        };
    }else{
        return {
            valid:false,
            status:{
                code:405,
            },
            validation:{
                error:true,
                valid:false,
                code:'INVALID_REQ_MATHOD',
                message:req.helpers.json.get(validation, `${method}.message.error`, 'Method not allowed')
            }
        };
    }
}

exports.validate = validate;