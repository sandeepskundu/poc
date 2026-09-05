import Divider from 'aio-global-raw-ui/atoms/divider';

export default {
	title:"Atoms/Divider",
	argTypes:{

	},
	component:Divider,
	tags:['autodocs'],
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Divider component defines the separator displayed between content sections or child elements. It can accept text, a React element, icon, or custom JSX to visually divide and organize content within the component.<br/><br/><strong>Import path:</strong><code>import Divider from 'aio-global-raw-ui/atoms/divider';</code><br/><br/><strong>Component directory:</strong><code>./libs/frontend/ui/raw/atoms/divider/index</code><br/><br/>"
			}
		}
	},
	mockdata:{
		defaults:{
			config:{
				ds:{
					predefined:{
						minWidth:100
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
				element:"div"
			},
			ds:{
				predefined:{
					color:"c00000",
					background:"c11407",
					minHeight:1,
					minWidth:100
				}
			}
		}
	}
}