const messages = process.aioBeLibs('helpers/_private/utils/messages');

const valid = async (req) => {
    return {
        error:null,
        valid:true,
        status:{
            code:200,
            message:"",
        }
    }
}

const error = async (req, code) => {
    let dmsg = req.helpers.json.val(messages, 'permission.default');
    let cmsg = req.helpers.json.val(messages, `permission.${code}`, dmsg);

    return {
        error:{
            message:cmsg
        },
        
        status:{
            message:cmsg,
        }
    }
}

const invalid = async (req, code) => {
    return await req.helpers.json.merge({
        valid:false,
        error:{
            message:'',
            code:code || 'PERMISSION_NOT_GRANTED'
        },
        status:{
            code:401,
            message:"",
        }
    }, await error(req, code))
}


exports.valid = valid;
exports.invalid = invalid;