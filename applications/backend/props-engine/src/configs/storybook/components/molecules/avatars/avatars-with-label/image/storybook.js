const helpers = process.uiHelpers();
const text = process.aioAppConfigs('storybook/raw/atoms/typography/text');

module.exports = {
    parameters:{
		docs:{
			description:{
				component:"Displays an avatar alongside one or more text labels, such as a user's name, email address, designation, or other supporting information. This variant is commonly used in user profiles, lists, menus, and account-related interfaces to present identity details in a compact and readable layout."
			}
		}
	},
    mockdata:{
        defaults:{
            labels:{
                content:{
                    title:"Sample name",
                    description:'sampleemailid@email.com'
                }
            },
            avatar:{
                image:{
                    src:"http://localhost:2200/insider-cdn/statics/images/avatar.jpg"
                }
            }
        },
        variants:{
            variant:{}
        }
    }
}