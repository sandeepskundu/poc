import Text from 'aio-global-raw-ui/atoms/typography/text';

export default {
	title:"Atoms/Typography/Text",
	argTypes:{

	},
	component:Text,
	tags:['autodocs'],
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Text renders textual content using the design system's typography standards. It provides consistent styling, semantic markup, and configurable presentation options such as size, weight, color, spacing, alignment, and other design-system-defined properties. The component helps ensure accessibility, readability, and visual consistency across the application while adhering to established design guidelines and typography patterns.<br/><br/><strong>Import path:</strong><code>import Text from 'aio-global-raw-ui/atoms/typography/text';</code><br/><br/><strong>Component directory:</strong><code>./libs/frontend/ui/raw/atoms/typography/text/index</code><br/><br/>"
			}
		}
	},
	mockdata:{
		defaults:{
			text:{
				content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
			}
		},
		variants:{
			sandeep:{

			}
		}
	}
}

export const Base = {
	args:{
		text:{
			markup:{
				element:"p"
			},
			content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
		}
	}
}

export const Sandeep = {
	args:{
		text:{
			markup:{
				element:"p"
			},
			content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
		}
	}
}