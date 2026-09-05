

const assign = async (appConfig, req, res, next) => {
    let rval = {};
    let map = {
        'marchant':['M', 'E', 'R', 'C', 'H', 'A', 'N', 'T', '_', 'T', 'O', 'K', 'E', 'N'].join('')
    };

    let list = req.helpers.json.val(appConfig, 'tokens', {});

    for(const a in map){
        rval[map[a]] = req.helpers.json.val(list, a, '');
    }

    return rval;
}

exports.assign = assign;