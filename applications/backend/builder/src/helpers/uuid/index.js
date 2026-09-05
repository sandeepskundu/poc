const number = () => {
    return Math.floor(Math.random() * 9999) + 1000
}

const random = () => {
    return ((Date.now())+number())+number();
}

const id = (l) => {
    const len = (l?l:26);
    const str = 'xxxxxxxx-xxxx-4xxx-yxxx-';

    return str.replace(/[xy]/g, (c) => {
        const r = Math.random() * len | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return r.toString(len);
    });
}

exports.create = () => {
    return (`${id()}${random()}`).toUpperCase()
}