const helpers = process.uiHelpers();
const storybook = require('./../storybook');

module.exports = helpers.json.merge(storybook || {}, {
    mockdata:{
        defaults:{
            icons:{
                left:{
                    config:{
                        icon:{
                            name:"home"
                        }
                    }
                },
                right:{
                    config:{
                        icon:{
                            name:"bell"
                        }
                    }
                }
            }
        }
    }
});