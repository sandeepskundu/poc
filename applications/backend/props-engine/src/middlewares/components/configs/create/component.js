const path = require('path');
let comp = `import helpers from 'ui-helpers';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);

    const ui = () => {
        return <></>
    }

    return ui();
};

export default Comp;`

const create = async (req, res, next) => {
    let compPath = req.helpers.json.get(req, 'body.data.component.path', '');
    let filePath = path.join(process.cwd(), './../../../libs/frontend/ui', `${compPath}/index.jsx`);

    if(req.helpers.file.reader.async.read(filePath)){
    }else{
        await req.helpers.file.writer.async.write(filePath, comp);
    }
}

exports.create = create;