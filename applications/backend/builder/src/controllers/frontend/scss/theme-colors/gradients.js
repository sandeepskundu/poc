
const linearGradient = (item, appConfig, req, res, next) => {
    const to = req.helpers.json.val(item, 'to')
    const from = req.helpers.json.val(item, 'from')
    const deg = req.helpers.json.val(item, 'angle')

    if(to && from && deg){
        return `linear-gradient(${deg}, var(--${from}), var(--${to}))`
    }
   
    return false
}

const get = async (item, appConfig, req, res, next) => {
    switch(item.type) {
        case 'linear-gradient':
            return await linearGradient(item, appConfig, req, res, next)
        break;
        case y:
          // code block
        break;
        default:
          return false
      }
}


const create = async (rval, greds, appConfig, req, res, next) => {
    for(const a in greds){
        let val = await get(greds[a], appConfig, req, res, next);

        if(val){
            rval = `${rval}\n\t--g${a}:${val};`
        }
        
    }
    return rval;
}

exports.create = create;