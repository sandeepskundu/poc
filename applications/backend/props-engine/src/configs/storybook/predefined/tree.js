const buildTree = (rval, tree) => {
    if(typeof tree === 'object'){
        for(let a in tree){
            rval[a] = rval[a] || {};
            rval[a].index = tree[a];

            if(tree[a] && typeof tree[a].type === 'undefined'){    
                rval[a] = buildTree(rval[a], tree[a]);
            }else{
                if(a != 'type' && a != '___' && tree[a] && tree[a].type === 'nested'){
                    let childs = null;

                    if(tree[a]['___'] && tree[a]['___'].nested){
                        childs = tree[a]['___'].nested;
                    }

                    if(childs && typeof childs === 'object'){
                        rval[a] = buildTree(rval[a], childs);
                    }
                }
            }
        }
    }

    return rval;
};

exports.get = (pd) => {
    let rval = {};

    for(let a in pd){
        rval[a] = buildTree({}, (pd[a] || {})) 
    }

    console.log(rval)

    return rval;
}