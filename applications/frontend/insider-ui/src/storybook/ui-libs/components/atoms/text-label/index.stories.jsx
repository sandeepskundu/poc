import TextLabel from 'aio-global-ui/atoms/text-label';

export default {
	title:"Atoms/TextLabel",
	component:TextLabel,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Tags (also known as “chips”) are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once.<br/><br /><strong>Import path:</strong><code>import TextLabel from 'aio-global-ui/atoms/text-label';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/text-label/index</code><br/><br/>"
			}
		}
	},
	tags:['autodocs'],
	argTypes:{

	}
}

export const Base = {
	args:{
		label:"Button",
		wrapperDs:{
			element:"p"
		},
		moreLess:{

		},
		textDs:{
			css:{
				others:'',
				class:{
					margin:{
						1:0
					}
				}
			},
			attrs:{

			},
			dataAttrs:{

			}
		},
		leftIcon:{
			css:{
				class:{
					margin:{
						1:0,
						2:12,
						3:0,
						4:0
					}
				}
			}
		},
		rightIcon:{

		},
		attrs:{

		},
		dataAttrs:{

		}
	}
}