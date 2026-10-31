const component = require('./component');
const storybook = require('./../storybook');

const init = async (req, res, next) => {
    await component.create(req, res, next);
    await storybook.create.init(req, res, next);
}

exports.init = init;