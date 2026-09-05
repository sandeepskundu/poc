import Heading from 'aio-global-ui/atoms/0/typography/heading';

export default {
	title:"Atoms/0/Typography/Heading",
	component:Heading,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Badges help highlight important information, such as notifications or new and unread messages. They’re primarily used for communicating secondary or additional information to text.<br/><br /><strong>Import path:</strong><code>import Heading from 'aio-global-ui/atoms/0/typography/heading';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/0/typography/heading/index</code><br/><br/>"
			}
		}
	},
	tags:['autodocs'],
	argTypes:{

	}
}

export const Base = {
	args:{
		config:{
			content:'',
			markup:{
				element:"h1"
			},
			ds:{
				css:{
					class:{
						family:"md",
						fontsize:"xxl"
					},
					flags:{
						isDisplay:true
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