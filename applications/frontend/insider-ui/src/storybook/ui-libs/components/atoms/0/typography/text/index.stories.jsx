import Text from 'aio-global-ui/atoms/0/typography/text';

export default {
	title:"Atoms/0/Typography/Text",
	component:Text,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Badges help highlight important information, such as notifications or new and unread messages. They’re primarily used for communicating secondary or additional information to text.<br/><br /><strong>Import path:</strong><code>import Text from 'aio-global-ui/atoms/0/typography/text';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/0/typography/text/index</code><br/><br/>"
			}
		}
	},
	tags:['autodocs'],
	argTypes:{

	}
}

export const Base = {
	args:{
		text:{
			content:'',
			markup:{
				element:"p"
			},
			ds:{
				css:{
					class:{
						fontsize:"lg"
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