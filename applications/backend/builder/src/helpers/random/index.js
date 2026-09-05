const string = (len) => {
    let r = "";
    let l = (len?len:16);
    let p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < l; i++){
        r += p.charAt(Math.floor(Math.random() * p.length));
    }

    return r;
  }

const uuid = (l) => {
    let len = (l?l:16)
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = Math.random() * len | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(len);
    });
}

const id = (l, uc) => {
    if(uc){
        return (string((l?l:6)).toUpperCase());
    }else{
        return string((l?l:6));
    }
}

exports.id = id;
exports.uuid = uuid;
exports.string = string;