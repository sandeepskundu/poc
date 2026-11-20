const signature = async (item, req, res, next) => {
    let sign = await req.helpers.mongoose.docHelpers.signature.decode({
        signature:req.helpers.json.val(item, 'signature', {})
    }, req, res, next);

    let signl = req.helpers.json.length(sign || {});

    if(signl && signl > 0){
        return {
            data:{...sign, ...{_deleted:0}},
            valid:true
        }
    }else{
        return {
            data:item,
            valid:false
        }
    }
}

const start = async () => {

}