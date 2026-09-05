const duplicate = (li) => {
    let rv = false;

    if(li && li.lenght > 0){
        let m = {};

        for(let a in li){
            let n = li[a];
                m[n] = m[n]?(m[n]+1):1

            if(m[n] > 1){
                rv = true;
                break;
            }
        }
    }

    return rv;
}

exports.duplicate = duplicate;