import Tag from 'aio-global-ui/atoms/tag';

export default {
	title:"Atoms/Tag",
	component:Tag,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Tags (also known as “chips”) are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once.<br/><br /><strong>Import path:</strong><code>import Tag from 'aio-global-ui/atoms/tag';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/tag/index</code><br/><br/>"
			}
		}
	},
	tags:['autodocs'],
	argTypes:{

	}
}

export const Base = {
	args:{
		element:"span",
		label:"Button",
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