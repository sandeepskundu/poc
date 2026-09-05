const lineClamped = (el) => {
    if(el && el.scrollHeight){
        return el.scrollHeight - el.clientHeight > 1;
    }else{
        return false;
    }
}

exports.lineClamped = lineClamped;