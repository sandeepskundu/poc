const qp = {
    query:{
        otherConfigs:{
            doNotCheckQueryLength:true
        }
    }
}

const pmatrix = {
    'fetch':['viewer', 'editor', 'contributor', 'manager', 'owner', 'superadmin'],
    'update':['editor', 'contributor', 'manager'],
    'create':['contributor', 'manager'],
    'remove':['owner', 'superadmin']
}

const checkOrders = {
    "asc":{
        'fetch':['viewer', 'editor', 'contributor', 'manager', 'owner', 'superadmin'],
        'update':['editor', 'contributor', 'manager'],
        'create':['contributor', 'manager'],
        'remove':['owner', 'superadmin']
    },
    "desc":{
        'fetch':['superadmin', 'owner', 'manager', 'contributor', 'editor', 'viewer'],
        'update':['manager', 'contributor', 'editor'],
        'create':['manager', 'contributor'],
        'remove':['superadmin', 'owner']
    }
}

exports.qp = qp;
exports.pmatrix = pmatrix;
exports.checkOrders = checkOrders;