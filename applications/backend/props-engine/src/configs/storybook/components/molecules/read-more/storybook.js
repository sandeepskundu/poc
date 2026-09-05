const helpers = process.uiHelpers();
const storybook = process.aioAppConfigs('storybook/components/atoms/typography/text/description/storybook');
module.exports = helpers.json.merge(storybook || {}, {
    parameters:{
		docs:{
			description:{
				component:"The Read More component helps manage lengthy content by initially displaying a truncated version of the text. When the content exceeds the configured limit, a Read More action is shown to reveal the full content. Users can collapse the expanded content at any time using the Read Less action. This component improves readability while conserving screen space."
			}
		}
	},
    mockdata:{
        defaults:{
            toggle:{
                lines:2
            },
            content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        }
    }
});