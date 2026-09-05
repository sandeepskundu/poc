import Container from 'aio-global-raw-ui/atoms/container';

export default {
	title:"Atoms/Container",
	argTypes:{

	},
	component:Container,
	tags:['autodocs'],
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Container is a layout component that acts as a wrapper for other elements and components. It provides a structured area for organizing content, controlling spacing, alignment, sizing, and styling while maintaining a consistent layout across the application.<br/><br/><strong>Import path:</strong><code>import Container from 'aio-global-raw-ui/atoms/container';</code><br/><br/><strong>Component directory:</strong><code>./libs/frontend/ui/raw/atoms/container/index</code><br/><br/>"
			}
		}
	},
	mockdata:{
		defaults:{
			content:"This is a sample body text and will get replaced with original content or child html elements"
		},
		variants:{

		}
	}
}

export const Base = {
	args:{
		config:{
			markup:{
				element:"div"
			}
		},
		content:"This is a sample body text and will get replaced with original content or child html elements"
	}
}