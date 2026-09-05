const set = (arg) => {
    let copy = window[_CN].json.copy(arg);
    let map = (`routes.${arg.prop.category}.${arg.prop.page}`);

    delete copy.path;
    delete copy.view;

    window[_CN].constants.set(map, copy);
}

exports.set = set;