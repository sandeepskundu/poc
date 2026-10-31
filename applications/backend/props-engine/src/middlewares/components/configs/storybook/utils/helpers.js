const path = require('path');

const storybookPath =  async (req, res, next) => {
    return path.join(process.cwd(), './src/configs/storybook-kundu');
}

const compPath = async (req, res, next) => {
    return path.join(await storybookPath(req, res, next), req.helpers.json.get(req, 'body.data.component.path', ''));
}

exports.compPath = compPath;
exports.storybookPath = storybookPath;