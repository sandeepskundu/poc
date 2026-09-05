import _badge from 'aio-global-ui/atoms/_badge';

export default {
	title:"Atoms/_badge",
	component:_badge,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Badges help highlight important information, such as notifications or new and unread messages. They’re primarily used for communicating secondary or additional information to text.<br/><br /><strong>Import path:</strong><code>import _badge from 'aio-global-ui/atoms/_badge';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/_badge/index</code><br/><br/>"
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
		element:"p",
		size:"lg",
		icon:{

		},
		leftIcon:{

		},
		rightIcon:{

		},
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