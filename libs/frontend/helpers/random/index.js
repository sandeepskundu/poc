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

const number = (seq, mId) => {
    let now = Date.now() - 1609459200000;
    let sequence = seq || Math.floor(1000 + Math.random() * 9000);
    let machineId = mId || Math.floor(1000 + Math.random() * 9000);
        sequence = (sequence + 1) & 0xfff;

    return ((BigInt(now) << 22n) | (BigInt(machineId) << 12n) | BigInt(sequence)).toString();
}

const key = () => {
    return `r${number()}${id(10)}`
}

exports.id = id;
exports.key = key;
exports.uuid = uuid;
exports.string = string;
exports.number = number;