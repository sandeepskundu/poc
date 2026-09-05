import Divider from 'aio-global-ui/atoms/divider';

export default {
	title:"Atoms/Divider",
	component:Divider,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Tags (also known as “chips”) are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once.<br/><br /><strong>Import path:</strong><code>import Divider from 'aio-global-ui/atoms/divider';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/divider/index</code><br/><br/>"
			}
		}
	},
	tags:['autodocs'],
	argTypes:{

	}
}

export const Base = {
	args:{
		element:"div",
		size:1,
		ds:{
			theme:{
				background:{
					default:"c00103"
				}
			},
			css:{
				class:{
					radius:{
						1:6
					}
				}
			}
		},
		attrs:{

		},
		dataAttrs:{

		}
	}
}