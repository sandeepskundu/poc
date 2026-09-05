const name = ['m', 'o', 'n', 'g', 'o', 'o', 's', 'e'].join('');
const mdb = process.nodeModules(name);

exports.create = () => {
    return (new mdb.Types.ObjectId()).toString();
}