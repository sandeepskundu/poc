const tab = (n) => {
    let rv = ``;

    if(n > 0){
        for(let a = 0; a<n; a++){
            rv += `\t`;
        }
    }

    return rv;
}

const start = (rval, conf, tn, req, prevObj) => {
    let rv = [];
    for(const a in conf){
        let v = ``;
        let name = req.helpers.json.val(conf[a], 'name', a);
        let type = req.helpers.json.val(conf[a], 'type', a);
        let match = req.helpers.json.val(conf[a], 'match', a);
        let childs = req.helpers.json.val(conf[a], 'childs', {});

        if(name){
            if(type === 'object'){
                if(match){
                    v = `${v}\n${tab(tn+1)}${name} ${match} {\n${start(``, childs, tn+1, req, true)}\n${tab(tn+1)}}`
                }else{
                    v = `${v}\n${tab(tn+1)}${name} {\n${tab(tn)}${start(``, childs, tn+1, req, true)}${tab(tn+1)}\n}\n`
                }
            }else{
                if(type === 'placeholder'){
                    v = `${v}\n${tab(tn+1)}${name}${!prevObj?'\n':''}`;
                }else{
                    if(match){
                        v = `${v}${tab(tn)}${name} ${match};${!prevObj?'\n':''}`
                    }
                }
            }
        }

        rv.push(`${tab(!prevObj?tn+1:tn)}${v}`); 
    }

    rval = `${rval}${rv.join('\n')}`;

    return rval;
}

exports.start = start;