import Bubble from 'aio-global-ui/atoms/bubble';

export default {
	title:"Atoms/Bubble",
	component:Bubble,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Tags (also known as “chips”) are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once.<br/><br /><strong>Import path:</strong><code>import Bubble from 'aio-global-ui/atoms/bubble';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/bubble/index</code><br/><br/>"
			}
		}
	},
	tags:['autodocs'],
	argTypes:{

	}
}

export const Base = {
	args:{
		label:'',
		element:"span",
		size:"lg",
		ds:{
			theme:{
				colorPairing:{
					default:"000"
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