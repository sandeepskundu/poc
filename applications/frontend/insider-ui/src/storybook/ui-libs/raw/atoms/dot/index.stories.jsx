import Dot from 'aio-global-raw-ui/atoms/dot';

export default {
	title:"Atoms/Dot",
	argTypes:{

	},
	component:Dot,
	tags:['autodocs'],
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Divider component defines the separator displayed between content sections or child elements. It can accept text, a React element, icon, or custom JSX to visually divide and organize content within the component.<br/><br/><strong>Import path:</strong><code>import Dot from 'aio-global-raw-ui/atoms/dot';</code><br/><br/><strong>Component directory:</strong><code>./libs/frontend/ui/raw/atoms/dot/index</code><br/><br/>"
			}
		}
	},
	mockdata:{
		defaults:{
			config:{
				ds:{
					predefined:{

					}
				}
			}
		},
		variants:{

		}
	}
}

export const Base = {
	args:{
		config:{
			markup:{
				element:"span"
			},
			ds:{
				predefined:{
					background:"c00106"
				}
			}
		}
	}
}