import Badge from 'aio-global-ui/atoms/badge';

export default {
	title:"Atoms/Badge",
	component:Badge,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Badges help highlight important information, such as notifications or new and unread messages. They’re primarily used for communicating secondary or additional information to text.<br/><br /><strong>Import path:</strong><code>import Badge from 'aio-global-ui/atoms/badge';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/badge/index</code><br/><br/>"
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