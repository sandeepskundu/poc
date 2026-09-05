const helpers = process.uiHelpers();
const storybook = require('./../storybook');

module.exports = helpers.json.merge(storybook || {}, {
    mockdata:{
        defaults:{
            avatars:{
                left:{
                    image:{
                        src:"http://localhost:2200/insider-cdn/statics/images/avatar.jpg"
                    }
                },
                right:{
                    enable:true,
                    image:{
                        src:"http://localhost:2200/insider-cdn/statics/images/avatar.jpg"
                    }
                }
            }
        }
    }
});