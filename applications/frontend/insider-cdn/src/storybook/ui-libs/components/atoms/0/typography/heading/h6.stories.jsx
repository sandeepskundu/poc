import H6 from 'aio-global-ui/atoms/0/typography/heading/h6';

export default {
	title:"Atoms/0/Typography/Heading/H6",
	component:H6,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Badges help highlight important information, such as notifications or new and unread messages. They’re primarily used for communicating secondary or additional information to text.<br/><br /><strong>Import path:</strong><code>import H6 from 'aio-global-ui/atoms/0/typography/heading/h6';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/0/typography/heading/h6</code><br/><br/>"
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
				element:"h6"
			},
			ds:{
				css:{
					class:{
						family:"md",
						fontsize:"xs"
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