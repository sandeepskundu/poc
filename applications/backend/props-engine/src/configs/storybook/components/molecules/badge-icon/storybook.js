const helpers = process.uiHelpers();
const storybook = process.aioAppConfigs('storybook/components/atoms/badge/icon/storybook');

module.exports = helpers.json.merge(helpers.json.remove(storybook || {}, ['icons', 'avatars', 'content']), {
    parameters:{
		docs:{
			description:{
				component:"The Badge Icon component renders a badge containing an icon to provide a concise visual indicator. It is suitable for representing statuses, actions, categories, alerts, or notifications where an icon alone conveys the intended meaning. The component supports customizable sizes, colors, variants, and icon types to align with the design system."
			}
		}
	},
    mockdata:{
        defaults:{
            icon:{
                config:{
                    icon:{
                        name:"home"
                    }
                }
            }
        }
    }
});